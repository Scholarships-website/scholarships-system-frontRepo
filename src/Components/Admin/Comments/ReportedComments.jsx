import React, { useEffect, useState } from 'react'
import '../Dashboard.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faEllipsisVertical, faMagnifyingGlass, faPenToSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Box, Modal, Pagination, Rating, Skeleton, Typography } from '@mui/material';
import { Bounce, toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  borderRadius: '8px',
};

export default function ReportedComments() {
  const [loading, setLoading] = useState(true);
  const [scholarships, setScholarships] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const [open, setOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState(null);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      // Step 1: Fetch the scholarships
      const response = await axios.get(`${process.env.BASE_URL}/api/v1/scholarships`);
      const scholarships = response.data;

      // Step 2: Fetch feedbacks reported for each scholarship
      const scholarshipsWithFeedbacks = await Promise.all(scholarships.map(async (scholarship) => {
        try {
          //${process.env.BASE_URL}/api/v1/scholarships/${scholarship._id}/feedbacks/reported
          const feedbackResponse = await axios.get(`${process.env.BASE_URL}/api/v1/scholarships/${scholarship._id}/feedbacks`);
          const feedbacks = feedbackResponse.data;

          // Step 3: Check if feedbacks are valid
          if (feedbacks && feedbacks !== "no feedbacks for this scholarship" && feedbacks.length > 0) {
            // Combine feedbacks with the scholarship object
            return {
              ...scholarship,
              feedbacks: feedbacks // Attach the feedbacks to the scholarship
            };
          } else {
            return null; // Return null if no valid feedbacks
          }
        } catch (error) {
          console.error(`Error fetching feedbacks for scholarship with _id: ${scholarship._id}`, error);
          return null; // Return null in case of an error
        }
      }));

      // Step 4: Filter out scholarships with no feedback
      const scholarshipsWithFeedbacksOnly = scholarshipsWithFeedbacks.filter(scholarship => scholarship !== null);

      // Step 5: Set the state with the scholarships combined with feedbacks
      setScholarships(scholarshipsWithFeedbacksOnly);
      console.log(scholarshipsWithFeedbacksOnly); // Log the final result
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchScholarships();
  }, []);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedScholarships = scholarships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const viewFeedbacks = async (id) => {
    setLoadingFeedbacks(true);
    try {
      //${process.env.BASE_URL}/api/v1/scholarships/${id}/feedbacks/reported
      const response = await axios.get(`${process.env.BASE_URL}/api/v1/scholarships/${id}/feedbacks`);
      const feedbacks = response.data;

      // Fetch student data for each feedback
      const feedbacksWithStudentData = await Promise.all(
        feedbacks.map(async (feedback) => {
          try {
            const studentResponse = await axios.get(`${process.env.BASE_URL}/api/v1/getStudentDataFromId/${feedback.student_id}`);
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
      console.log("Feedbacks with student data:", feedbacksWithStudentData);
      // setFeedbacks();
      handleOpen();
      setLoadingFeedbacks(false)
    } catch (error) {
      toast.error(error.response?.data, {
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
      setLoadingFeedbacks(false);
    }
  };

  const getRandomColor = () => {
    // List of basic colors (avoiding white and light colors)
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

    // Randomly select a color from the list
    const randomIndex = Math.floor(Math.random() * basicColors.length);
    return basicColors[randomIndex];
  };

  // const deleteReportedComment = async (id) => {
  //     Swal.fire({
  //         title: "Are you sure?",
  //         text: "You won't be able to revert this!",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Yes, delete it!",
  //     }).then(async (result) => {
  //         if (result.isConfirmed) {
  //             try {
  //                 await axios.delete(`${process.env.BASE_URL}/api/v1/feedback/${id}`);
  //                 // Remove the deleted comment
  //                 setReportedComments((prevReportedComments) => ReportedComments.filter((reportedComment) => reportedComments.id !== id));
  //                 Swal.fire({
  //                     title: "Deleted!",
  //                     text: "comment has been deleted.",
  //                     icon: "success",
  //                 });
  //             } catch (error) {
  //                 console.error("Error deleting comment:", error);
  //                 Swal.fire({
  //                     title: "Error!",
  //                     text: "There was a problem deleting the comment.",
  //                     icon: "error",
  //                 });
  //             }
  //         }
  //     });
  // };
  return (
    <>
      <div className="scholarships-admin scholarships-advertiser">
        <div className="mb-2 justify-content-between pb-3">
          <h1 className="ps-4 main-col mb-4">Reported Comments</h1>
        </div>
        <div className="table-container">
          {loading ? (
            <table className="table table-hover bg-transparent">
              <thead>
                <tr className="bg-transparent">
                  <th scope="col">#</th>
                  <th scope="col">Scholarship Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <tr key={index}>
                    <th scope="row"><Skeleton variant="text" width={20} /></th>
                    <td><Skeleton variant="text" width="50%" /></td>
                    <td><Skeleton variant="rectangular" width={50} height={20} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <table className="table table-hover bg-transparent">
                <thead>
                  <tr className="bg-transparent">
                    <th scope="col">#</th>
                    <th scope="col">Scholarship Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedScholarships.length ? (
                    paginatedScholarships.map((scholarship, index) => (
                      <React.Fragment key={scholarship._id}>
                        <tr>
                          <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                          <td>{scholarship.scholarsip_name}</td>
                          <td className="action">
                            <div style={{ marginLeft: '15px' }}>
                              <button
                                className="dropdown-item "
                                onClick={() => viewFeedbacks(scholarship._id)}
                              >
                                <FontAwesomeIcon icon={faComments} />
                              </button>
                              <Modal
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="scholarship-details-title"
                                aria-describedby="scholarship-details-description"
                              >
                                <Box sx={style}>
                                  <Typography id="scholarship-details-title" variant="h6" component="h1" sx={{ fontSize: '30px' }}>
                                    <strong>Reported Comments</strong>
                                  </Typography>
                                  {loadingFeedbacks ? (
                                    <Box id="scholarship-details-skeleton" sx={{ mt: 2 }}>
                                      <Skeleton variant="text" width="60%" />
                                    </Box>
                                  ) : (
                                    feedbacks && feedbacks.map((feedback, index) => (
                                      <Box key={index} id="scholarship-details-description" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ backgroundColor: getRandomColor(), mr: 2, width: "50px", height: "50px" }}>
                                          {feedback.studentData?.fullname[0].toUpperCase()}
                                        </Avatar>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                          <Typography variant="body1"><strong>{feedback.studentData?.fullname}</strong></Typography>
                                          <Rating value={feedback.rating} readOnly />
                                          <Typography variant="body2" sx={{ mt: 1 }}>
                                            {feedback.content}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    ))
                                  )}
                                </Box>
                              </Modal>
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No Accepted Scholarships</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination
                count={Math.ceil(scholarships.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                className='pagination-search'
                size="large"
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}
