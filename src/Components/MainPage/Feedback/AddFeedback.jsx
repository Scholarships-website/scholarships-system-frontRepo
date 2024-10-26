import React from 'react';
import { useFormik } from 'formik';
import './AddFeedback.css';
import Navbar from '../../Shared/Navbar/Navbar';
import { addFeedback } from '../../../Validation/validation';
import axios from 'axios';

const AddFeedback = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            role: 'student',
            feedback: '',
            rating: '',
        },
        validationSchema: addFeedback,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/scholarships/feedbacks', values);
                if (response.status === 200) {
                    alert('Thank you for your feedback!');
                    resetForm();
                } else {
                    alert('Failed to submit feedback. Please try again.');
                }
            } catch (error) {
                alert('An error occurred. Please try again later.');
            }
        },
    });

    return (
        <>
            <Navbar />
            <div className="addFeedbackContainer">
                <form className="wrapper" onSubmit={formik.handleSubmit}>
                    <div className="title">Rate your experience</div>
                    <div className="content">
                        We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback.
                    </div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}

                    <select name="role" {...formik.getFieldProps('role')}>
                        <option value="student">Student</option>
                        <option value="advertiser">Advertiser</option>
                    </select>
                    {formik.touched.role && formik.errors.role ? <div className="error">{formik.errors.role}</div> : null}

                    <div className="rate-box">
                        {[...Array(5)].map((_, i) => (
                            <React.Fragment key={i}>
                                <input
                                    type="radio"
                                    id={`star${i}`}
                                    name="rating"
                                    value={i + 1}
                                    checked={formik.values.rating === String(i + 1)}
                                    onChange={() => formik.setFieldValue('rating', String(i + 1))}
                                />
                                <label className="star" htmlFor={`star${i}`}></label>
                            </React.Fragment>
                        ))}
                    </div>
                    {formik.touched.rating && formik.errors.rating ? <div className="error">{formik.errors.rating}</div> : null}
                    <textarea
                        name="feedback"
                        cols="30"
                        rows="6"
                        placeholder="Tell us about your experience!"
                        {...formik.getFieldProps('feedback')}
                    ></textarea>
                    {formik.touched.feedback && formik.errors.feedback ? <div className="error">{formik.errors.feedback}</div> : null}
                    <button type="submit" className="submit-btn">
                        Send
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddFeedback;
