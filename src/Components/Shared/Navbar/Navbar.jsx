import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../../../Context/UserContext';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const { userToken, setUserToken } = useContext(UserContext);
    const navigate = useNavigate();
    const isLoggedIn = userToken !== null;

    const handleLogout = () => {
        setUserToken(null);
        localStorage.removeItem('userToken');

        toast.success('Logged out successfully!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce,
        });

        navigate('/login');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const aboutSection = document.getElementById('about');
            const homeSection = document.getElementById('home'); // Home section or top of the page
            if (aboutSection) {
                const aboutTop = aboutSection.getBoundingClientRect().top;
                const aboutBottom = aboutSection.getBoundingClientRect().bottom;
                const homeTop = window.scrollY; // Top of the page
                // User is at the very top of the page (home section)
                if (homeTop < 50) {
                    setActiveSection('home');
                }
                // User is in the 'About Us' section
                else if (aboutTop < window.innerHeight / 2 && aboutBottom > window.innerHeight / 2) {
                    setActiveSection('about');
                }
                // User has scrolled past the 'About Us' section (back to 'home')
                else if (aboutBottom < window.innerHeight / 2) {
                    setActiveSection('home');
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
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
                        <NavLink
                            exact="true"
                            to="/"
                            className={activeSection === 'home' ? 'active-link' : ''}
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <a
                            href="#about"
                            className={activeSection === 'about' ? 'active-link' : ''}
                            onClick={() => setMenuOpen(false)}
                        >
                            About Us
                        </a>
                    </li>
                    <li>
                        <NavLink
                            to="/search-scholarships"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                            onClick={() => setMenuOpen(false)}
                        >
                            Search Scholarships
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact-us"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                            onClick={() => setMenuOpen(false)}
                        >
                            Contact Us
                        </NavLink>
                    </li>
                </ul>

                <div className="navbar-auth">
                    {isLoggedIn ? (
                        <>
                            <NavLink
                                to="/dashboard"
                                className='icons'
                            >
                                <FontAwesomeIcon icon={faUser} style={{ color: "#418447", }} />
                            </NavLink>
                            <button onClick={handleLogout} className='icons' >
                                <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "#418447", }} />
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) => (isActive ? 'active-link' : '')}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) => (isActive ? 'active-link' : '')}
                            >
                                Sign Up
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
