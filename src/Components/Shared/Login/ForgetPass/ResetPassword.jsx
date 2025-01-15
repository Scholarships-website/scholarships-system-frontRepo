import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../../Input/Input'; // Assuming you have a reusable Input component
import './ForgetPass.css';
import { resetPassword } from '../../../../Validation/validation';
import Navbar from '../../Navbar/Navbar';

function ResetPassword() {
    const { resetToken } = useParams(); // Get token from URL
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Formik setup with Yup validation schema
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: resetPassword,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/resetPassword/${resetToken}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ newPassword: values.newPassword }),
                });

                const data = await response.json();
                if (response.ok && data.message === 'Password updated successfully') {
                    toast.success('Password reset successfully. You can now log in with your new password.', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        transition: Bounce,
                    });
                    setTimeout(() => {
                        navigate('/login');
                    }, 1500);
                } else {
                    toast.error(data.message || 'An error occurred. Please try again.', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('An error occurred. Please try again.', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });
            } finally {
                setIsLoading(false);
            }
        },
    });

    // Delay initial loading for Skeleton
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Input fields
    const inputs = [
        {
            type: 'password',
            id: 'newPassword',
            name: 'newPassword',
            title: 'New Password',
            value: formik.values.newPassword,
        },
        {
            type: 'password',
            id: 'confirmPassword',
            name: 'confirmPassword',
            title: 'Confirm Password',
            value: formik.values.confirmPassword,
        },
    ];

    const renderInputs = inputs.map((input, index) => (
        <Input
            type={input.type}
            id={input.id}
            name={input.name}
            title={input.title}
            key={index}
            errors={formik.errors}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            value={formik.values[input.name]}
            colSize="col-md-12"
        />
    ));

    return (
        <>
            <ToastContainer
                position="bottom-right"
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
            {/* <div className="logoContainer">
                <a href="/"><img src="/assets/img/logo.png" alt="logo" width="100px" /></a>
            </div> */}
            <Navbar/>
            <div className='forgetContainer'>
                {isLoading ? (
                    <Skeleton variant="rounded" width={500} height={500} />
                ) : (
                    <iframe src="https://lottie.host/embed/a8117a62-076f-45f6-be6e-05d4c5d22eca/yorBJEf3zv.json" width="500px" height="500px" />
                )}
                <div className="forgot-password-container">
                    <form onSubmit={formik.handleSubmit} className='forgot-password-form'>
                        <h3>Reset Password</h3>
                            {renderInputs}
                            <div className="btnContainer mt-3">
                                <button type="submit" className="resetBtn btn btn-lg" disabled={isLoading}>
                                    {isLoading ? 'Processing...' : 'Reset Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
}

export default ResetPassword;
