import React, { useState } from 'react';
import axios from 'axios';
import './ForgetPass.css';
function VerifyCode({ email, onNext }) {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the code and email to backend for verification
            const response = await axios.post('http://localhost:5000/api/v1/auth/verify-code', { email, code });
            if (response.data.success) {
                onNext(); // Go to reset password step
            }
        } catch (error) {
            setError('Invalid code');
        }
    };

    return (
        <>
            <div className="logoContainer">
                <img src="src/assets/img/logo.png" alt="logo" width="100px" />
            </div>
            <div className='forgetContainer'>
                <iframe src="https://lottie.host/embed/a8117a62-076f-45f6-be6e-05d4c5d22eca/yorBJEf3zv.json" width="500px" height="500px"></iframe>
                <div className="forgot-password-container">
                    <form onSubmit={handleSubmit} className='forgot-password-form'>
                        <h3>Verify Code</h3>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter the code sent to your email"
                            required
                        />
                        {error && <p>{error}</p>}
                        <button type="submit">Verify</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default VerifyCode;
