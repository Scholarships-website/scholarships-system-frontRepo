import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Rating, Skeleton, TextField, TextareaAutosize, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  const { roleId, userToken, studentData } = useContext(UserContext);
  const [openR, setOpenR] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [liked, setLiked] = useState(false);
  const [isLoadingL, setIsLoadingL] = useState(false);
  const [isLoadingD, setIsLoadingD] = useState(false);
  const [likes, setLikes] = useState({}); // To store likes count for each feedback
  const [dislikes, setDislikes] = useState({}); // To store dislikes count for each feedback
  const [loader, setLoader] = useState(false);
  const [SData, setSData] = useState([]);
  const [SDislike, setSDislike] = useState([]);
  const [SReprted, setSReported] = useState([]);
  const [isComment, setIsComment] = useState(false);

  const fetchStudentDate = async () => {
    setLoader(true);
    if (studentData) {
      // console.log("liked feedbacks", studentData.likedFeedbacks);
      setSData(studentData.likedFeedbacks);
      setSDislike(studentData.dislikedFeedbacks);
      setSReported(studentData.reportedFeedbacks);
      setLoader(false);
    }
  };
  useEffect(() => {
    if (studentData) {
      fetchStudentDate();
    }
  }, [studentData]);

  if (!studentData) {
    return <p>Loading student data...</p>;
  }
  const viewFeedbacks = async (id) => {
    setLoadingFeedbacks(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/${id}/feedbacks`);
      const feedbacks = response.data;
      console.log(response.data)

      if (response === 204 || response.data == 'no feedbacks for this scholarship') {
        setFeedbacks([]);
        setLikes({});
        setDislikes({});
        return; // Exit early if no feedbacks
      }
      if (response.data.length == 0)
        return;
      if (response.data.length > 0) {
        const feedbacksWithStudentData = await Promise.all(
          feedbacks?.map(async (feedback) => {
            try {
              const studentResponse = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/v1/getStudentDataFromId/${feedback.student_id}`
              );
              if (studentResponse.data.scholarships_feedbacks?.includes(feedback._id)) {
                setIsComment(true);
                // console.log(isComment + 'is comment?? ');
              }
              else {
                setIsComment(false);
              }
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
        console.log(feedbacksWithStudentData);
        setFeedbacks(feedbacksWithStudentData);

        // Initialize likes and dislikes
        const initialLikes = {};
        const initialDislikes = {};
        feedbacksWithStudentData.forEach((feedback) => {
          initialLikes[feedback._id] = feedback.likes;
          initialDislikes[feedback._id] = feedback.dislikes;
        });

        setLikes(initialLikes);
        setDislikes(initialDislikes);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      toast.error(
        error.response?.data || "An error occurred while fetching feedbacks.",
        {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    } finally {
      setLoadingFeedbacks(false);
    }
  };
  const handleDeleteComment = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete your comment ?",
      text: "You won't be able to revert this! ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/feedbacks/${id}`);
          // Remove the deleted comment
          setFeedbacks((prevFeedbacks) => {
            if (!Array.isArray(prevFeedbacks)) return [];
            return prevFeedbacks.filter(
              (Comment) => Comment._id !== id
            );
          });
          Swal.fire({
            title: "Deleted!",
            text: "comment has been deleted.",
            icon: "success",
          });
          await viewFeedbacks(id);
        } catch (error) {
          console.error("Error deleting comment:", error);
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the comment.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleLikeToggle = async (_id, feedback) => {
    let response;
    const liked = SData?.includes(_id); // Determine if the ID is already liked
    // console.log('liked?', liked);

    if(SDislike?.includes(_id)){
      await handleDislike(_id);
    }
    setIsLoadingL(true);
    try {
      if (liked) {
        // Call the unlike endpoint
        response = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/feedbacks/${_id}/likes/remove`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
      } else {
        // Call the like endpoint
        response = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/feedbacks/${_id}/likes/add`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
      }
      if (response.status === 200) {
        console.log("Before setSData:", SData);
        setSData((prevSData) => {
          const updatedData = liked
            ? prevSData.filter((item) => item !== _id) // Remove the ID
            : [...prevSData, _id]; // Add the ID
          console.log("Updated SData:", updatedData);
          return updatedData;
        });
        // Update likes count
        setLikes((prevLikes) => ({
          ...prevLikes,
          [_id]: liked ? prevLikes[_id] - 1 : prevLikes[_id] + 1,
        }));

        toast.success(liked ? "Like removed!" : "Like added!");
        await viewFeedbacks(id);
      } else {
        toast.error('Something went wrong. Please try again.', {
          position: 'bottom-right',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to toggle like.");
    } finally {
      setIsLoadingL(false);
      console.log(SData)
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

    const reporterId = roleId;

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/feedbacks/report`, {
        feedback_id: selectedFeedbackId,
        reporter_id: reporterId,
        reason: reason,
      });
      toast.success("Reported the feedback successfully!");
      await viewFeedbacks(id);
      handleCloseR();
    } catch (error) {
      console.error("Error reporting feedback:", error);
      toast.error(
        error.response && error.response?.data
          ? `Failed: ${error.response?.data}`
          : "Failed to report the feedback."
      );
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
      } else {
        const errorData = await response.json();
        console.error("Error submitting feedback:", errorData);
        toast.error(errorData.message);
      }
      await viewFeedbacks(id);
    } catch (error) {
      console.error("Error:", error);
      toast.error(`${error.message}`);
    }
    handleCloseWriteModal(); // Close the modal after submission
  };

  useEffect(() => {
    viewFeedbacks(id);
  }, [feedbacks?.length]);


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
      const initialLikes = feedbacksWithStudentData.reduce((acc, feedback) => {
        acc[feedback._id] = feedback.likes;
        return acc;
      }, {});
      const initialDislikes = feedbacksWithStudentData.reduce((acc, feedback) => {
        acc[feedback._id] = feedback.dislikes;
        return acc;
      }, {});
      setLikes(initialLikes);
      setDislikes(initialDislikes);
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

  const handleDislike = async (_id, feedback) => {
    setIsLoadingD(true);
    let response;
    const disliked = SDislike?.includes(_id); // Determine if the ID is already disliked
    // console.log('disliked?', disliked);
    if(SData?.includes(_id)){
      await handleLikeToggle(_id);
    }
    try {
      if (disliked) {
        response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/feedbacks/${_id}/dislikes/remove`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`, // Include the token in the Authorization header
            },
          });
      }
      else {
        response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/scholarships/feedbacks/${_id}/dislikes/add`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`, // Include the token in the Authorization header
            },
          });
      }
      if (response.status === 200) {
        console.log("Before SDislike:", SDislike);
        setSDislike((prevSDislike) => {
          const updatedData = disliked
            ? prevSDislike.filter((item) => item !== _id) // Remove the ID
            : [...prevSDislike, _id]; // Add the ID
          console.log("Updated SDislike:", updatedData);
          return updatedData;
        });
        setDislikes((prevDislikes) => ({
          ...prevDislikes,
          [_id]: disliked ? prevDislikes[_id] - 1 : prevDislikes[_id] - 1, // Revert increment
        }));
        toast.success(disliked ? "Dislike removed!" : "Dislike added!");
        await viewFeedbacks(id);
      }
      else {
        toast.error('Something went wrong. Please try again.', {
          position: 'bottom-right',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
    catch (error) {
      console.error("Error toggling dislike:", error);
      toast.error("Failed to toggle dislike.");
    } finally {
      setIsLoadingD(false);
      console.log(SDislike)

    }
  };

  const getFixedColor = (name) => {
    const colors = ['#F44336', '#E91E63', '#9C27B0', '#3F51B5', '#2196F3', '#4CAF50', '#FF9800', '#795548'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash); // Generate hash
    }
    const index = Math.abs(hash) % colors.length; // Map hash to a color index
    return colors[index];
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
            feedbacks.slice(0, 3).map((feedback, index) => {
              const { _id, content, studentData } = feedback;
              const { reportedFeedbacks, likedFeedbacks, dislikedFeedbacks } = studentData;
              return (
                <Box
                  key={index}
                  id="scholarship-details-description"
                  sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: '8px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }} >
                    <Avatar
                      sx={{ backgroundColor: getFixedColor(feedback.studentData?.fullname), mr: 2, width: "50px", height: "50px" }}
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
                        onClick={() => handleLikeToggle(feedback._id, feedback)}
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'none',
                          color: '#418447',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                        disabled={isLoadingL}
                      >
                        <FontAwesomeIcon
                          icon={SData?.includes(feedback._id) ? solidThumbsUp : regularThumbsUp}
                          size="2xs"
                        />
                        <span style={{ fontSize: '14px' }}>
                          {likes[feedback._id] ?? feedback.likes}
                        </span>
                      </button>
                      <button
                        onClick={() => handleDislike(feedback._id, feedback)}
                        style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#418447', display: 'flex', alignItems: 'center', gap: '5px' }}
                        disabled={isLoadingD}
                      >
                        <FontAwesomeIcon
                          icon={SDislike?.includes(feedback._id) ? solidThumbsDown : regularThumbsDown}
                          size="2xs"
                        />
                        <span style={{ fontSize: '14px' }}> {dislikes[feedback._id] || feedback.dislikes}</span>
                      </button>
                      <button
                        onClick={() => handleOpenDialog(feedback._id)}
                        style={{
                          border: 'none',
                          background: 'none',
                          color: feedback.reported ? '#999' : '#418447',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                        disabled={SReprted?.includes(feedback._id)}
                        aria-label={SReprted?.includes(feedback._id) ? 'Report button disabled' : 'Report feedback'} // Dynamic aria-label
                        title={SReprted?.includes(feedback._id) ? 'You have already reported this feedback' : 'Click to report feedback'}
                      >
                        <FontAwesomeIcon icon={SReprted?.includes(feedback._id) ? faFlagCheckered : faFlag} size="2xs" />
                        <span style={{ fontSize: '14px' }}> {SReprted?.includes(feedback._id) ? 'Reported' : 'Report'}</span>
                      </button>
                      {roleId === feedback.student_id && (
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteComment(feedback._id)}
                          style={{
                            border: 'none',
                            background: 'none',
                            color: 'red',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                          title='delete your feedback '
                        >
                          <FontAwesomeIcon icon={faTrash} size="2xs" />
                        </button>
                      )}
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
              )
            })
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
              <div title={isComment ? 'You already commented on this scholarship' : 'Add your comment'}>
                <button
                  className='btn feedbacks-btn'
                  onClick={handleOpenWriteModal}
                  disabled={isComment}
                >
                  Add Your Feedback
                </button>
              </div>
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
                        sx={{ backgroundColor: getFixedColor(feedback.studentData?.fullname), mr: 2, width: "50px", height: "50px" }}
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
                          onClick={() => handleLikeToggle(feedback._id, feedback)} // Pass the specific feedback id
                          style={{
                            cursor: 'pointer',
                            border: 'none',
                            background: 'none',
                            color: '#418447',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                          disabled={isLoadingL}
                        >
                          <FontAwesomeIcon
                            icon={SData?.includes(feedback._id) ? solidThumbsUp : regularThumbsUp}
                            size="2xs"
                          />
                          <span style={{ fontSize: '14px' }}>
                            {likes[feedback._id] ?? feedback.likes}
                          </span>
                        </button>
                        <button
                          onClick={() => handleDislike(feedback._id, feedback)}
                          style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#418447', display: 'flex', alignItems: 'center', gap: '5px' }}
                          disabled={isLoadingD}
                        >
                          <FontAwesomeIcon
                            icon={SDislike?.includes(feedback._id) ? solidThumbsDown : regularThumbsDown}
                            size="2xs"
                          />
                          <span style={{ fontSize: '14px' }}> {dislikes[feedback._id] || feedback.dislikes}</span>
                        </button>
                        <button
                          onClick={() => handleOpenDialog(feedback._id)}
                          style={{
                            cursor: feedback.reported ? 'not-allowed' : 'pointer',
                            border: 'none',
                            background: 'none',
                            color: feedback.reported ? '#999' : '#418447',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                          disabled={SReprted?.includes(feedback._id)}
                          aria-label={SReprted?.includes(feedback._id) ? 'Report button disabled' : 'Report feedback'} // Dynamic aria-label
                          title={SReprted?.includes(feedback._id) ? 'You have already reported this feedback' : 'Click to report feedback'}
                        >
                          <FontAwesomeIcon icon={SReprted?.includes(feedback._id) ? faFlagCheckered : faFlag} size="2xs" />
                          <span style={{ fontSize: '14px' }}> {SReprted?.includes(feedback._id) ? 'Reported' : 'Report'}</span>
                        </button>
                        {roleId === feedback.student_id && (
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteComment(feedback._id)}
                            style={{
                              border: 'none',
                              background: 'none',
                              color: 'red',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                            }}
                            title='delete your feedback '
                          >
                            <FontAwesomeIcon icon={faTrash} size="2xs" />
                          </button>
                        )}
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