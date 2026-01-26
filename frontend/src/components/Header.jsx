import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/components/Header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../contexts/AuthContext';

const NavLink = ({ to, children }) => (
    <Link className="element" to={to}>
        <span>{children}</span>
    </Link>
);

function Header() {
    const navigate = useNavigate();
    const { isLoggedIn, userName, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

    const handleLogout = () => {
        logout();
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
                        </>
                    ) : (
                        <>
                            <NavLink className="header-menu-element" to="/login">Login</NavLink>
                            <NavLink className="header-menu-element" to="/join">Join</NavLink>
                        </>
                    )}

                </nav>
            </div>
        </header>
    );
};

export default Header;