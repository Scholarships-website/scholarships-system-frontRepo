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
    );
}

export default ResetPassword;
