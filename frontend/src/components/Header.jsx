import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/components/Header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../contexts/AuthContext';

const NavLink = ({ to, children, ...props }) => (
    <Link className="element" to={to} {...props}>
        <span>{children}</span>
    </Link>
);

function Header() {
    const navigate = useNavigate();
    const { isLoggedIn, userName, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);
    const toggleDesktopMenu = () => setIsDesktopMenuOpen(prevState => !prevState);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        setIsDesktopMenuOpen(false);
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="logo"><i>Delrano</i></Link>
            </div>

            <div className='header-center'>
                {/* search input */}
                <div>
                    <input
                        name="artist-search"
                        className="artist-search"
                        placeholder="Search.."
                    />
                </div>
            </div>

            <div className='header-right'>
                <div className='search-icon'>
                    <Link to="/search"><FontAwesomeIcon icon={faSearch} /></Link>
                </div>
                <button className="hamburger" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>

                    {isLoggedIn ? (
                        <>
                            <NavLink to="/profile">{userName}</NavLink>
                            <button className="desktop-hamburger header-menu-element" onClick={toggleDesktopMenu}>
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink className="header-menu-element" to="/login">Login</NavLink>
                            <NavLink className="header-menu-element" to="/join">Join</NavLink>

                            <button className="desktop-hamburger header-menu-element" onClick={toggleDesktopMenu}>
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </button>

                        </>
                    )}
                </nav>

                <nav className={`desktop-menu ${isDesktopMenuOpen ? 'open' : ''}`}>
                    {isLoggedIn ? (
                        <>
                            <NavLink to="/profile/settings">Settings</NavLink>
                            <button onClick={handleLogout}>Log out</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/" className="desktop-nav-element">More</NavLink>
                            <NavLink to="/" className="desktop-nav-element">Articles</NavLink>
                        </>
                    )}
                </nav>

            </div>
        </header >
    );
};

export default Header;