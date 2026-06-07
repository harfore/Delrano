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

    // const getFollowerCount = (token) = {}
    const followers_count = 23;
    const following_count = 14;
    const concert_count = 12;
    const crowd_notes_count = 20;

    const redirectToSettings = () => {
        navigate('/profile/settings');
    };

    return (
        <div className='page'>
            <div className='page-content'>
                {isLoggedIn ? (
                    <div className='profile-page'>
                        <h2>{userName}</h2>
                        <p className='bio'>and the stadium is where I feel at home</p>
                        <div className='profile-numbers'>
                            <h4 className='profile-number'>
                                {followers_count} followers
                            </h4>
                            <h4 className='profile-number'>
                                {followers_count} following
                            </h4>
                            <h4 className='profile-number'>
                                {concert_count} concerts
                            </h4>
                            <h4 className='profile-number'>
                                {crowd_notes_count} crowd notes
                            </h4>
                        </div>
                        <div className='profile-display'>
                            <div className='profile-section'>
                                <div className='profile-section-title'>
                                    FAVORITES
                                </div>
                            </div>
                            <div className='profile-section'>
                                <div className='profile-section-title'>
                                    RECENT EVENTS
                                </div>

                            </div>
                            <div className='profile-section'>
                                <div className='profile-section-title'>
                                    CROWD NOTES
                                </div>
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