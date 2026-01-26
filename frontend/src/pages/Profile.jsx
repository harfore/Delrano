import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { NotFound } from '../components/NotFound';
// import '../styles/Auth.css';

const NavLink = ({ to, children }) => (
    <Link className="element" to={to}>
        <span>{children}</span>
    </Link>
);

const Profile = () => {
    const { isLoggedIn, userName } = useContext(AuthContext);

    return (
        <div className='page'>
            <div className='page-content'>
                {isLoggedIn ? (
                    <div>
                        <h2>{userName}</h2>
                        <NavLink to="/profile/settings">
                            <button className="button">
                                Settings
                            </button>
                        </NavLink>
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