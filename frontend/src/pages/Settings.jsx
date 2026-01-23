import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { NotFound } from '../components/NotFound';
import '../styles/Auth.css';
import '../styles/Settings.css';

const NavLink = ({ to, children }) => (
    <Link className="element" to={to}>
        <span>{children}</span>
    </Link>
);

const Settings = () => {
    const { isLoggedIn, userName } = useContext(AuthContext);

    return (
        <div className='page'>
            <div className='page-content'>
                <h2 className='page-headline'>User {userName} | Settings</h2>
                {
                    isLoggedIn ? (
                        <div className='settings-layout'>
                            <div className='settings-nav'>
                                <div className='settings-section'>PROFILE</div>
                                <div className='settings-section'>PREFERENCES</div>
                            </div>
                            <div className='settings-main'>
                                <div className='profile-settings'>
                                    <div className='input-set'>
                                        <div className='input-field'>
                                            <label htmlFor="Email" className='input-label'>Contact Email</label>
                                            <input type="text" placeholder='remiharfoush@gmail.com' />
                                        </div>
                                    </div>
                                    <div className='input-set'>
                                        <div className='input-field'>
                                            <label htmlFor="Bio" className='input-label'>Change Bio</label>
                                            <input name="text" placeholder='..' ></input>
                                        </div>
                                    </div>
                                    <div className='input-set'>
                                        <div className='input-field'>
                                            <label htmlFor="Password">Change Password</label>
                                            <input type="password" placeholder='Change password?' />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className='button'
                                    >Update info
                                    </button>
                                </div>
                                <div className>

                                </div>
                            </div>
                        </div >
                    ) : (
                        <NotFound />
                    )
                }
            </div>
        </div>
    )
}

export default Settings;