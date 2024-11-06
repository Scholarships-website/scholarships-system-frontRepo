import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ForgetPass.css';
import { Skeleton } from '@mui/material';
function RequestResetPassword({ onNext }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send email to backend API to trigger reset code
            const response = await axios.post('http://localhost:3000/api/v1/forgotPassowrd', { email });
            if (response.data.success) {
                onNext(email); // Go to next step
            }
        } catch (error) {
            setError('Email not found or error occurred');
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
                        <button type="submit">Send Code</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RequestResetPassword;
