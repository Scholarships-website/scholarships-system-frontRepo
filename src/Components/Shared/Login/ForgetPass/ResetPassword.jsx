import React, { useState } from 'react';
import axios from 'axios';
import './ForgetPass.css';
function ResetPassword({ email }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Send the new password to the backend
            const response = await axios.post('http://localhost:5000/api/v1/auth/reset-password', { email, newPassword });
            if (response.data.success) {
                setSuccess('Password reset successful');
            }
        } catch (error) {
            setError('Error resetting password');
        }
    };

    return (
        <>
            <div className="logoContainer">
                <a href="/"><img src="src/assets/img/logo.png" alt="logo" width="100px" /></a>
            </div>
            <div className='forgetContainer'>
                <iframe src="https://lottie.host/embed/a8117a62-076f-45f6-be6e-05d4c5d22eca/yorBJEf3zv.json" width="500px" height="500px"></iframe>
                <div className="forgot-password-container">
                    <form onSubmit={handleSubmit} className='forgot-password-form'>
                        <h3>Reset Password</h3>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                        />
                        {error && <p>{error}</p>}
                        {success && <p>{success}</p>}
                        <button type="submit">Reset Password</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
