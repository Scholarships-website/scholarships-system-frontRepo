import { Avatar, Box, Modal, Rating, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
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
function ScholarshipFeedback({ id }) {
    const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
    const [feedbacks, setFeedbacks] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        viewFeedbacks(id);
    }, []);
    const viewFeedbacks = async (id) => {
        setLoadingFeedbacks(true);
        try {
            // const response = await axios.get(`http://localhost:3000/api/v1/scholarships/${id}/feedbacks`);
            // setFeedbacks(response.data);
            setFeedbacks(sampleFeedbacks);
            // handleOpen();
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
    const viewFeedbacksModal = async (id) => {
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
        <div className='similar-scholarships feedbacks-details p-50'>
            <h2 className='feedback-header'>What Students Are Saying About This Scholarship </h2>
            <div className="feedback-detail d-flex align-items-center">
                <div className="img-container">
                    <iframe src="https://lottie.host/embed/58f42626-220c-4149-91dd-de2aff65518c/cUrQyZsgDJ.json" width='500px' height='500px'></iframe>
                </div><div className="some-feedbacks">
                    {loadingFeedbacks ? (
                        <Box id="scholarship-details-skeleton" sx={{ mt: 2 }}>
                            <Skeleton variant="text" width="60%" />
                        </Box>
                    ) : (
                        feedbacks && feedbacks.slice(0, 3).map((feedback, index) => (
                            <Box key={index} id="scholarship-details-description" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ backgroundColor: getRandomColor(), mr: 2, width: "50px", height: "50px" }}>
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
                    <button className='btn feedbacks-btn' onClick={() => viewFeedbacksModal(id)}> View More Feedbacks</button>
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
                            {loadingFeedbacks ? (
                                <Box id="scholarship-details-skeleton" sx={{ mt: 2 }}>
                                    <Skeleton variant="text" width="60%" />
                                </Box>
                            ) : (
                                feedbacks && feedbacks.map((feedback, index) => (
                                    <Box key={index} id="scholarship-details-description" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ backgroundColor: getRandomColor(), mr: 2, width: "50px", height: "50px" }}>
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

            </div>
        </div>
    )
}

export default ScholarshipFeedback