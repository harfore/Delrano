import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { NotFound } from '../components/NotFound';
import '../styles/Profile.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faGear } from '@fortawesome/free-solid-svg-icons';
// import '../styles/Auth.css';

const NavLink = ({ to, children }) => (
    <Link className="element" to={to}>
        <span>{children}</span>
    </Link>
);

const Profile = () => {
    const navigate = useNavigate();
    const { isLoggedIn, userName, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const redirectToSettings = () => {
        navigate('/profile/settings');
    };

    return (
        <div className='page'>
            <div className='page-content'>
                {isLoggedIn ? (
                    <div>
                        <h2>{userName}</h2>
                        <div className='profile-section'>
                            <div className='profile-section-title'>
                                Favorites
                            </div>
                        </div>
                        <div className='profile-section'>
                            <div className='profile-section-title'>
                                Recent events
                            </div>

                        </div>
                        <div className='profile-section'>
                            <div className='profile-section-title'>
                                Crowd Notes
                            </div>
                        </div>
                        <div className='profile-section'>
                            <div className='profile-section-title'>

                            </div>
                        </div>
                        <NavLink to="/profile/settings">
                            <button className="button">
                                <FontAwesomeIcon icon={faGear} onClick={redirectToSettings} className='icon-svg' />
                                Settings
                            </button>
                        </NavLink>
                        <button className="button" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} className='icon-svg' />
                            Logout
                        </button>
                    </div>
                ) : (
                    <NotFound />
                )
                }
            </div>
        </div>
    )
}

export default Profile;