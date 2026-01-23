import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import fetchCountries from '../../services/api/FetchCountries';
import ImagesPaths from '../../constants/imagesPaths.js'

const Join = () => {

    const [imagesSetOne] = useState(() =>
        ImagesPaths.getRandomImages(4)
    );
    const [imagesSetTwo] = useState(() =>
        ImagesPaths.getRandomImages(4)
    );

    return (
        <div className='page'>
            <div className='page-content'>
                <div className='upper-collection'>
                    {imagesSetOne.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            className="collection-image"
                            alt="Decorative Image"
                        />
                    ))}
                </div>
                <div className='auth-center'>
                    <h1 className='page-headline'>Join Likion Nation!</h1>
                    <div className='input-form'>
                        <div className='input-set'>
                            <label htmlFor="email">Email</label>
                            <input type="text" className='input-field' />
                        </div>

                        <div className='input-set'>
                            <label htmlFor="username">Username</label>
                            <input type="text" className='input-field' />
                        </div>

                        <div className='input-set'>
                            <label htmlFor="password">Password</label>
                            <input type="password" className='input-field' />
                        </div>

                        <div className='input-set'>
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input type="password" className='input-field' />
                        </div>

                        <button className='button'>CREATE ACCOUNT</button>
                    </div>
                </div>
                <div className='lower-collection'>
                    {imagesSetTwo.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            className="collection-image"
                            alt="Decorative Image"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Join;