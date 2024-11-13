import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisVertical, faUserXmark, faXmark, faSortUp, faSortDown, faChevronDown, faEye, faComments } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UserContext } from '../../../Context/UserContext';
import { Avatar, Box, Modal, Pagination, Rating, Skeleton, Typography, useMediaQuery } from '@mui/material';
import { Bounce, ToastContainer, toast } from 'react-toastify';

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
function ScholarshipsFeedbacks() {
  const { userToken, roleId, userId } = useContext(UserContext);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const [open, setOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState(null);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/advertisers/${roleId}/scholarships/accept`);
      setScholarships(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roleId) {
      fetchScholarships();
    }
  }, [roleId]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedScholarships = scholarships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!roleId) {
    return (
      <div>
        <Skeleton variant="text" width={410} height={60} />
        <Skeleton variant="rectangular" width={800} height={400} style={{ marginTop: '10px' }} />
      </div>
    );
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const viewFeedbacks = async (id) => {
    setLoadingFeedbacks(true);
    try {
      // const response = await axios.get(`http://localhost:3000/api/v1/scholarships/${id}/feedbacks`);
      // setFeedbacks(response.data);
      setFeedbacks(sampleFeedbacks);
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
      setLoadingFeedbacks(false);
    }
  };
  const sampleFeedbacks = [
    {
      username: 'John Doe',
      rating: 4,
      content: 'This scholarship has greatly helped me further my education. Highly recommend!',
    },
    {
      username: 'Jane Smith',
      rating: 5,
      content: 'Amazing opportunity! The application process was straightforward, and the scholarship is very beneficial.',
    },
    {
      username: 'Emily Johnson',
      rating: 3,
      content: 'Good scholarship, but the eligibility requirements could be a bit clearer.',
    },
    {
      username: 'Michael Brown',
      rating: 5,
      content: 'Fantastic experience! The scholarship was exactly what I needed to continue my studies.',
    },
    {
      username: 'Sophia Lee',
      rating: 2,
      content: 'While the scholarship is helpful, I faced a few challenges in the application process. Could use some improvements.',
    },
  ];
  const getRandomColor = () => {
    // List of basic colors (avoiding white and light colors)
    const basicColors = [
        '#FF0000', // Red
        '#00FF00', // Green
        '#0000FF', // Blue
        '#FFFF00', // Yellow
        '#FF6347', // Tomato (darker red)
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
        '#FF4500', // Orange Red
        '#DAA520', // Goldenrod
        '#9ACD32', // Yellow Green
        '#CD5C5C', // Indian Red
        '#B22222', // Firebrick
        '#008080', // Teal
        '#A9A9A9', // Dark Gray
        '#B8860B', // Dark Goldenrod
        '#556B2F', // Dark Olive Green
        '#8B4513', // Saddle Brown
        '#2E8B57', // Sea Green
        '#4B0082', // Indigo
        '#F4A300', // Saffron
        '#C71585', // Medium Violet Red
        '#000000', // Black
        '#808080', // Gray
        '#D3D3D3', // Light Gray
        '#A52A2A', // Brown
        '#5F9EA0', // Cadet Blue
        '#7FFF00', // Chartreuse
        '#D2691E', // Chocolate
        '#00CED1'  // Dark Turquoise
    ];

    // Randomly select a color from the list
    const randomIndex = Math.floor(Math.random() * basicColors.length);
    return basicColors[randomIndex];
};
  
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="scholarships-admin scholarships-advertiser">
        <div className="mb-2 justify-content-between pb-3">
          <h1 className="ps-4 main-col">Feedbacks</h1>
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
                                  <Typography id="scholarship-details-title" variant="h6" component="h1" sx={{fontSize:'30px'}}>
                                    <strong>Scholarship Feedbacks</strong>
                                  </Typography>
                                  {loadingFeedbacks ? (
                                    <Box id="scholarship-details-skeleton" sx={{ mt: 2 }}>
                                      <Skeleton variant="text" width="60%" />
                                    </Box>
                                  ) : (
                                    feedbacks && feedbacks.map((feedback, index) => (
                                      <Box key={index} id="scholarship-details-description" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{backgroundColor: getRandomColor(), mr: 2,width:"50px",height:"50px" }}>
                                          {feedback.username[0].toUpperCase()}
                                        </Avatar>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                          <Typography variant="body1"><strong>{feedback.username}</strong></Typography>
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

export default ScholarshipsFeedbacks