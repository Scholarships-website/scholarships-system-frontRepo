import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear user data from localStorage
        localStorage.removeItem('userToken');
        alert("You have been logged out.");
        navigate('/login');
    }, [navigate]);

    return (
        <div>
            Logging out...
        </div>
    );
}

export default Logout;
