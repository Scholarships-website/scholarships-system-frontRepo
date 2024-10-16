import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // State for the hamburger menu

    const handleLogout = () => {
        setIsLoggedIn(false);
        // Implement logout functionality here
    };

    // Toggle menu visibility
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo-container">
                {/* Hamburger Icon */}
                <div className="hamburger-icon" onClick={toggleMenu}>
                    ☰
                </div>
                <NavLink to="/" className="navbar-logo">
                    <img src="src/assets/img/logo.png" alt="Logo" />
                </NavLink>
            </div>
            {/* Nav Links */}
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

            {/* Auth buttons */}
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
        </nav>
    );
};

export default Navbar;
