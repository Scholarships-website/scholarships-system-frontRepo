import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../../../Context/UserContext';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { userToken, setUserToken } = useContext(UserContext);
    const navigate = useNavigate();
    const isLoggedIn = userToken !== null;

    const handleLogout = () => {
        // Clear user token and local storage
        setUserToken(null);
        localStorage.removeItem('userToken');

        // Show success notification
        toast.success('Logged out successfully!', {
            position: "bottom-right",
            autoClose: 3000,  // Consider a short auto-close for better UX
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });

        // Optionally navigate to the login page or home page
        navigate('/login'); // Ensure you have access to the navigate function
    };


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        // If necessary, perform any additional actions when userToken changes
    }, [userToken]);

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
            <nav className="navbar">
                <div className="navbar-logo-container">
                    <div className="hamburger-icon" onClick={toggleMenu}>
                        ☰
                    </div>
                    <NavLink to="/" className="navbar-logo">
                        <img src="src/assets/img/logo.png" alt="Logo" />
                    </NavLink>
                </div>
                <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                    <li>
                        <NavLink exact to="/" activeClassName="active-link" onClick={() => setMenuOpen(false)}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/search-scholarships" activeClassName="active-link" onClick={() => setMenuOpen(false)}>
                            Search Scholarships
                        </NavLink>
                    </li>
                    <li>
                        <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
                    </li>
                    <li>
                        <NavLink to="/contact-us" activeClassName="active-link" onClick={() => setMenuOpen(false)}>
                            Contact Us
                        </NavLink>
                    </li>
                </ul>

                <div className="navbar-auth">
                    {isLoggedIn ? (
                        <>
                            <NavLink to="/dashboard" activeClassName="active-link">Dashboard</NavLink>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" activeClassName="active-link">Login</NavLink>
                            <NavLink to="/signup" activeClassName="active-link">Sign Up</NavLink>
                        </>
                    )}
                </div>
            </nav></>
    );
};

export default Navbar;
