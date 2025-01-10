import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import './AddFeedback.css';
import Navbar from '../Shared/Navbar/Navbar';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { addFeedback } from '../../Validation/validation';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';

const AddFeedback = () => {
    const {userData, roleId,userToken } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top on component mount
    }, []);
    useEffect(() => {
        if (!userToken) {
            navigate('/login');
        }
    }, [userToken, navigate]);
    const formik = useFormik({
        initialValues: {
            id: roleId || '',
            name: userData?.username || '', 
            email: userData?.email || '', 
            role: userData?.role || 'Student',
            content: '',
            rating: '',
        },
        validationSchema: addFeedback,
        onSubmit: async (values, { resetForm }) => {
            console.log('Submitting:', values);
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/feedbacks/`, {
                    id: values.id,
                    content: values.content,
                    rating: values.rating,
                });
                console.log(response.data);
                toast.success('website feedback is created successfully!', {
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
                setTimeout(() => {
                    resetForm();
                }, 1000);
            } catch (error) {
                console.log(error);
                console.error('Feedback error:', error);
                toast.error(error.message, {
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
            }
        },
    });

    // Update formik's once roleId is available
    useEffect(() => {
        if (roleId && userData) {
            formik.setFieldValue('id', roleId);
            formik.setFieldValue('name', userData?.username || '');
            formik.setFieldValue('email', userData?.email || '');
            formik.setFieldValue('role',userData?.role || 'Student');
        }
    }, [roleId, userData]);

    if (!roleId || !userData) {
        return <form className="wrapper" ><Skeleton variant="rounded" width={500} height={500} /></form>;
    }
    return (
        <>
            <Navbar />
            <div className="addFeedbackContainer">
                <form className="wrapper" onSubmit={formik.handleSubmit}>
                    <div className="title">Rate your experience</div>
                    <div className="content">
                        We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback.
                    </div>
                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Name *"
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                    {/* Role */}
                    <select name="role" {...formik.getFieldProps('role')}>
                        <option value="student">Student</option>
                        <option value="advertiser">Advertiser</option>
                    </select>
                    {formik.touched.role && formik.errors.role ? <div className="error">{formik.errors.role}</div> : null}
                    {/* Rating */}
                    <div className="rate-box">
                        {[...Array(5)].map((_, i) => {
                            const starValue = (5-i).toString(); // Create star value 1 to 5
                            return (
                                <React.Fragment key={starValue}>
                                    <input
                                        type="radio"
                                        id={`star${starValue}`}
                                        name="rating"
                                        value={starValue}
                                        checked={formik.values.rating === starValue}  // Compare Formik value to determine which radio button is checked
                                        onChange={() => formik.setFieldValue('rating', starValue)}  // Update Formik field value when a star is clicked
                                    />
                                    <label className="star" htmlFor={`star${starValue}`}></label>
                                </React.Fragment>
                            );
                        })}
                    </div>
                    {formik.touched.rating && formik.errors.rating ? <div className="error">{formik.errors.rating}</div> : null}
                    {/* Feedback Content */}
                    <textarea
                        name="content"
                        cols="30"
                        rows="6"
                        placeholder="Tell us about your experience! *"
                        {...formik.getFieldProps('content')}
                    ></textarea>
                    {formik.touched.content && formik.errors.content ? <div className="error">{formik.errors.content}</div> : null}
                    {/* Submit Button */}
                    <button type="submit" className="submit-btn">
                        Send
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddFeedback;
