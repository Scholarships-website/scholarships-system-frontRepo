import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ForgetPass.css';
import { Skeleton } from '@mui/material';
import { Bounce, ToastContainer, toast } from 'react-toastify';
function RequestResetPassword({ onNext }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send email to backend API to trigger reset code
            const response = await fetch('http://localhost:3000/api/v1/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Frontend-URL': window.location.origin // Sends the full base URL (e.g., http://localhost:5173)
                },
                body: JSON.stringify({ email: email })
            });
            // console.log(response);
            const data = await response.json();
            // console.log(data);
            // Check if the response is ok (status code 2xx)
            if (!response.ok) {
                throw new Error(data.message);
            }
            toast.success('Email sent successfully!', {
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
        } catch (error) {
            let errorMessage = error.message || 'An error occurred';
            if (error.response) {
                const errorData = await error.response.json();
                errorMessage = errorData.message || 'Email sending failed';
            }
            // console.log(errorMessage);
            toast.error(errorMessage, {
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
    };
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
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
            <div className="logoContainer">
                <a href="/"><img src="assets/img/logo.png" alt="logo" width="100px" /></a>
            </div>
            <div className='forgetContainer'>
                {isLoading ?
                    (<Skeleton variant="rounded" width={500} height={500} />) :
                    (<iframe src="https://lottie.host/embed/a8117a62-076f-45f6-be6e-05d4c5d22eca/yorBJEf3zv.json" width="500px" height="500px">
                    </iframe>)
                }
                <div className="forgot-password-container">
                    <form onSubmit={handleSubmit} className='forgot-password-form'>
                        <h3>Forgot Password</h3>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                        {error && <p>{error}</p>}
                        <button type="submit">Reset Password</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RequestResetPassword;
