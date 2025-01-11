import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Rating, Skeleton, TextField, TextareaAutosize, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as regularThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown as solidThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as regularThumbsDown } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 8,
  overflowY: 'auto',
  borderRadius: '12px',
};
function ScholarshipFeedback({ id, status, endDate }) {
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const [loadingFeedbacksM, setLoadingFeedbacksM] = useState(true);
  const [feedbacks, setFeedbacks] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openWriteModal, setOpenWriteModal] = useState(false); // Second modal state
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const { roleId } = useContext(UserContext);
  const [isReported, setIsReported] = useState(false);
  const [openR, setOpenR] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [likes, setLikes] = useState(0);
  const [likedComments, setLikedComments] = useState({});
  const [dislikedComments, setDisLikedComments] = useState({});
  const [isLoadingL, setIsLoadingL] = useState(false);
  const [dislikes, setDisLikes] = useState(0);
  const [hasDisLiked, setHasDisLiked] = useState(false);
  const [isLoadingD, setIsLoadingD] = useState(false);



  const handleLikeToggle = async (id) => {
    setIsLoadingL(true);
    setLikedComments((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    try {
      if (likedComments[id]) {
        // Call the unlike endpoint
        await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/feedbacks/${id}/likes/remove`);
        setLikes((prev) => prev - 1); // Decrement like count
        toast.success("Like removed!");
      } else {
        // Call the like endpoint
        await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/feedbacks/${id}/likes/add`);
        setLikes((prev) => prev + 1); // Increment like count
        toast.success("Liked successfully!");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to toggle like.");
    } finally {
      setIsLoadingL(false); // Re-enable the button
    }
  };

  const handleOpenDialog = (feedbackId) => {
    setSelectedFeedbackId(feedbackId);
    setOpenR(true);
  };
  const handleCloseR = () => {
    setOpenR(false);
    setReason("");
  };
  const handleSubmitReport = async () => {
    if (!reason.trim()) {
      toast.error("Reason is required!");
      return;
    }

    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to report this feedback?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, report it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      const reporterId = roleId;

      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/feedbacks/report`, {
          feedback_id: selectedFeedbackId,
          reporter_id: reporterId,
          reason: reason,
        });

        toast.success("Reported the feedback successfully!");
        // setIsReported(true); // Mark feedback as reported
        handleCloseR();
      } catch (error) {
        console.error("Error reporting feedback:", error);
        toast.error(
          error.response && error.response?.data
            ? `Failed: ${error.response?.data}`
            : "Failed to report the feedback."
        );
      }
    }
  };

  // console.log(id);
  const handleOpenWriteModal = () => setOpenWriteModal(true);
  const handleCloseWriteModal = () => {
    setOpenWriteModal(false);
    setComment(''); // Clear the comment when closing
  };

  const handleSubmitFeedback = async () => {
    if (!comment || !rating) {
      toast.error("Please provide a rating and feedback.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/feedbacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: roleId,
          scholarship_id: id,
          rating,
          content: comment,
        }),
      });

      if (response.ok) {
        toast.success("Feedback submitted successfully!");
        handleCloseWriteModal(); // Close the modal after successful submission
        setComment('');          // Clear the comment input
        setRating(0);            // Reset rating
        await viewFeedbacks();
      } else {
        const errorData = await response.json();
        console.error("Error submitting feedback:", errorData);
        toast.error("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
    handleCloseWriteModal(); // Close the modal after submission
  };


  useEffect(() => {
    viewFeedbacks(id);
  }, []);
  const viewFeedbacks = async (id) => {
    setLoadingFeedbacks(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/${id}/feedbacks`);
      const feedbacks = response.data;

      // Fetch student data for each feedback
      const feedbacksWithStudentData = await Promise.all(
        feedbacks.map(async (feedback) => {
          try {
            const studentResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/getStudentDataFromId/${feedback.student_id}`);
            return {
              ...feedback,
              studentData: studentResponse.data,
            };
          } catch (error) {
            console.error(`Error fetching student data for feedback ID: ${feedback.id}`, error);
            return { ...feedback, studentData: null }; // Handle missing student data gracefully
          }
        })
      );

      setFeedbacks(feedbacksWithStudentData);
      // console.log()
      // console.log("Feedbacks with student data:", feedbacksWithStudentData);
    } catch (error) {
      toast.error(error.response?.data || "An error occurred while fetching feedbacks.", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      // Ensure loading is set to false regardless of success or failure
      setLoadingFeedbacks(false);
    }
  };
  const viewFeedbacksModal = async (id) => {
    setLoadingFeedbacksM(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/${id}/feedbacks`);
      const feedbacks = response.data;

      const feedbacksWithStudentData = await Promise.all(
        feedbacks.map(async (feedback) => {
          try {
            const studentResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/getStudentDataFromId/${feedback.student_id}`);
            return {
              ...feedback,
              studentData: studentResponse.data,
            };
          } catch (error) {
            console.error(`Error fetching student data for feedback ID: ${feedback.id}`, error);
            return { ...feedback, studentData: null }; // Handle missing student data gracefully
          }
        })
      );

      setFeedbacks(feedbacksWithStudentData);
      // console.log("Feedbacks with student data:", feedbacksWithStudentData);
      handleOpen();
      setLoadingFeedbacks(false)
    } catch (error) {
      toast.error(error.response.data, {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoadingFeedbacksM(false);
    }
  };

  const getRandomColor = () => {
    const basicColors = [
      '#FF0000', // Red
      '#00FF00', // Green
      '#0000FF', // Blue
      '#FFFF00', // Yellow
      '#FF6347', // Tomato
      '#8B0000', // Dark Red
      '#00008B', // Dark Blue
      '#228B22', // Forest Green
      '#FFD700', // Gold
      '#A52A2A', // Brown
      '#800080', // Purple
      '#808000', // Olive
      '#D2691E', // Chocolate
      '#4B0082', // Indigo
      '#2F4F4F', // Dark Slate Gray
    ];

    const randomIndex = Math.floor(Math.random() * basicColors.length);
    return basicColors[randomIndex];
  };

  const handleDislike = async (id) => {
    setIsLoadingD(true);
    setDisLikedComments((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    try {
      if (dislikedComments[id]) {
        // Call the unlike endpoint
        await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/feedbacks/${id}/dislikes/remove`);
        setDisLikes((prev) => prev - 1); // Decrement like count
        toast.success("Dislike removed!");
      } else {
        // Call the like endpoint
        await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/feedbacks/${id}/dislikes/add`);
        setDisLikes((prev) => prev + 1); // Increment like count
        toast.success("Disliked successfully!");
      }
    } catch (error) {
      console.error("Error toggling dislike:", error);
      toast.error("Failed to toggle dislike.");
    } finally {
      setIsLoadingD(false); // Re-enable the button
    }
  };



  return (
    <div className='similar-scholarships feedbacks-details p-50'>
      <h2 className='feedback-header'>What Students Are Saying About This Scholarship </h2>
      <div className="feedback-detail d-flex align-items-center">
        <div className="img-container">
          <iframe src="https://lottie.host/embed/58f42626-220c-4149-91dd-de2aff65518c/cUrQyZsgDJ.json" width='500px' height='500px'></iframe>
        </div>
        <div className="some-feedbacks">
          {/* {console.log(loadingFeedbacks)} */}
          {loadingFeedbacks ? (
            <Box id="scholarship-details-skeleton" >

              <Box sx={{ mt: 2 }}>
                <Skeleton variant="circular" width={70} height={70} sx={{ mr: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                  <Skeleton variant="rectangular" width="40%" height={20} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="80%" />
                </Box>
              </Box>
            </Box>
          ) : feedbacks && feedbacks.length > 0 ? (
            feedbacks.slice(0, 3).map((feedback, index) => (
              <Box
                key={index}
                id="scholarship-details-description"
                sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }} >
                  <Avatar
                    sx={{ backgroundColor: getRandomColor(), mr: 2, width: "50px", height: "50px" }}
                  >
                    {feedback.studentData?.fullname[0].toUpperCase()}
                  </Avatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Typography variant="body1">
                      <strong>{feedback.studentData?.fullname}</strong>
                    </Typography>
                    <Rating value={feedback.rating} readOnly />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {feedback.content}
                    </Typography>
                  </Box>
                </div>
                {/* Actions: Like, Dislike, Report */}
                <div>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <button
                      onClick={() => handleLikeToggle(feedback._id)} // Pass the specific feedback id
                      style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#418447', display: 'flex', alignItems: 'center', gap: '5px' }}
                      disabled={isLoadingL} // Disable the button while loading
                    >
                      <FontAwesomeIcon
                        icon={likedComments[feedback._id] ? solidThumbsUp : regularThumbsUp} // Use feedback._id to track the like state
                        size="2xs"
                      />
                      <span style={{ fontSize: '14px' }}>{feedback.likes}</span> {/* Display the number of likes */}
                    </button>
                    <button
                      onClick={() => handleDislike(feedback._id)}
                      style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#418447', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      <FontAwesomeIcon
                        icon={dislikedComments[feedback._id] ? solidThumbsDown : regularThumbsDown}
                        size="2xs"
                      />
                      <span style={{ fontSize: '14px' }}> {feedback.dislikes}</span>
                    </button>
                    <button
                      onClick={() => handleOpenDialog(feedback._id)}
                      style={{
                        cursor: isReported ? 'not-allowed' : 'pointer',
                        border: 'none',
                        background: 'none',
                        color: isReported ? '#999' : '#418447',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <FontAwesomeIcon icon={faFlag} size="2xs" />
                      <span style={{ fontSize: '14px' }}> {'Report'}</span>
                    </button>
                    <Dialog open={openR} onClose={handleCloseR} fullWidth maxWidth="xs">
                      <DialogTitle>Report Feedback</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Reason for reporting"
                          type="text"
                          fullWidth
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseR} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleSubmitReport} color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                </div>

              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ mt: 2 }}>
              No feedback available.
            </Typography>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
            {feedbacks && feedbacks.length > 3 && (
              <button className='btn feedbacks-btn' onClick={() => viewFeedbacksModal(id)}>
                View More Feedbacks
              </button>
            )}
            {status === 'accept' && new Date() > new Date(endDate) && (
              <button className='btn feedbacks-btn' onClick={handleOpenWriteModal}>
                Add Your Feedback
              </button>
            )}
          </div>
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="scholarship-details-title"
            aria-describedby="scholarship-details-description"
            BackdropProps={{
              style: {
                backgroundColor: 'rgba(0, 0, 0, 1)',
              },
            }}
          >
            <Box sx={style}>
              <Typography id="scholarship-details-title" variant="h6" component="h1" sx={{ fontSize: '30px' }}>
                <strong>Scholarship Feedbacks</strong>
              </Typography>
              {loadingFeedbacksM ? (
                <Box id="scholarship-details-skeleton" sx={{ mt: 2 }}>
                  <Skeleton variant="text" width="60%" />
                </Box>
              ) : (
                feedbacks && feedbacks.map((feedback, index) => (
                  <Box
                    key={index}
                    id="scholarship-details-description"
                    sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: '8px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                      <Avatar
                        sx={{ backgroundColor: getRandomColor(), mr: 2, width: "50px", height: "50px" }}
                      >
                        {feedback.studentData?.fullname[0].toUpperCase()}
                      </Avatar>
                      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <Typography variant="body1">
                          <strong>{feedback.studentData?.fullname}</strong>
                        </Typography>
                        <Rating value={feedback.rating} readOnly />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {feedback.content}
                        </Typography>
                      </Box>
                    </div>
                    {/* Actions: Like, Dislike, Report */}
                    <div>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 2,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <button
                          onClick={() => handleLikeToggle(feedback._id)} // Pass the specific feedback id
                          style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#418447', display: 'flex', alignItems: 'center', gap: '5px' }}
                          disabled={isLoadingL} // Disable the button while loading
                        >
                          <FontAwesomeIcon
                            icon={likedComments[feedback._id] ? solidThumbsUp : regularThumbsUp} // Use feedback._id to track the like state
                            size="2xs"
                          />
                          <span style={{ fontSize: '14px' }}>{feedback.likes}</span> {/* Display the number of likes */}
                        </button>
                        <button
                          onClick={() => handleDislike(feedback._id)}
                          style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#418447', display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                          <FontAwesomeIcon
                            icon={dislikedComments[feedback._id] ? solidThumbsDown : regularThumbsDown}
                            size="2xs"
                          />
                          <span style={{ fontSize: '14px' }}> {feedback.dislikes}</span>
                        </button>
                        <button
                          onClick={() => handleOpenDialog(feedback._id)}
                          style={{
                            cursor: isReported ? 'not-allowed' : 'pointer',
                            border: 'none',
                            background: 'none',
                            color: isReported ? '#999' : '#418447',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <FontAwesomeIcon icon={faFlag} size="2xs" />
                          <span style={{ fontSize: '14px' }}> {'Report'}</span>
                        </button>
                        <Dialog open={openR} onClose={handleCloseR} fullWidth maxWidth="xs">
                          <DialogTitle>Report Feedback</DialogTitle>
                          <DialogContent>
                            <TextField
                              autoFocus
                              margin="dense"
                              label="Reason for reporting"
                              type="text"
                              fullWidth
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseR} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={handleSubmitReport} color="primary">
                              Submit
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Box>
                    </div>

                  </Box>
                ))
              )}
            </Box>
          </Modal>
          {/* Write Feedback Modal */}
          <Modal
            keepMounted
            open={openWriteModal}
            onClose={handleCloseWriteModal}
            aria-labelledby="write-feedback-title"
            aria-describedby="write-feedback-description"
            BackdropProps={{
              style: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <Box sx={{ ...style, width: 400 }}>
              <Typography id="write-feedback-title" variant="h6" component="h1">
                <strong>Write Your Feedback</strong>
              </Typography>
              <Rating
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                precision={0.5} // Allows half-star ratings
                size="large"
              />
              <TextareaAutosize
                minRows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your feedback here..."
                style={{ width: '100%', marginTop: '20px', padding: '10px', borderRadius: '5px' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button variant="contained" color="primary" onClick={handleSubmitFeedback}>
                  Submit
                </Button>
                <Button variant="outlined" color="primary" onClick={handleCloseWriteModal}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>

        </div>

      </div>
    </div>
  )
}

export default ScholarshipFeedback