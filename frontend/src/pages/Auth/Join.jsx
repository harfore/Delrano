// multi-step registration form with validation and progress tracking
// handles user registration with email, password, username, and country selection

// Features:
// - Multi-step form navigation with validation at each step
// - Yup schema validation for all form fields
// - Dynamic country dropdown populated from API
// - Progress stepper visualization
// - Error handling and submission states
// - Automatic token storage upon successful registration

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import fetchCountries from '../../services/api/FetchCountries';
import ImagesPaths from '../../constants/imagesPaths.js';
import registerUser from '../../services/api/RegisterUser';
import FormInput from "../../components/Auth/FormInput";
import '../../styles/Auth.css'
import '../../styles/components/Form.css';

const Join = () => {

    const [imagesSetOne] = useState(() =>
        ImagesPaths.getRandomImages(4)
    );
    const [imagesSetTwo] = useState(() =>
        ImagesPaths.getRandomImages(4)
    );

    const schema = yup.object().shape({
        // form validation schema using yup
        email: yup.string().email('Invalid email').required('Email is required'),
        username: yup.string().min(3, 'Username must be at least 3 characters').max(22, 'Max 22 characters').required(),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        country: yup.string().required('Please select a country'),
    });

    // react Hook Form configuration
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        setValue, // getting current field values
        watch      // watching field changes
    } = useForm({
        resolver: yupResolver(schema),
    });

    const steps = [
        { label: '1', description: 'Please enter your email.', field: 'email' },
        { label: '2', description: 'Pick a username.', field: 'username' },
        { label: '3', description: 'Pick a password.', field: 'password' },
        { label: '4', description: 'Pick your country.', field: 'country' },
        { label: '5', description: 'Review your information and confirm.' },
    ];

    // component state
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        country: ''
    });
    const [countries, setCountries] = useState([]);
    const [submitError, setSubmitError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // fetch countries on component mount
    useEffect(() => {
        fetchCountries().then(setCountries);
    }, []);

    // updates form data and react-hook-form value on input change
    // @param {Object} e - the change event object
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setValue(name, value);
    };

    // handles form submission with validation and API call
    // @param {Object} formData - The complete form data
    const onSubmit = async (formData) => {
        setIsSubmitting(true);
        setSubmitError(null); // Reset error state

        try {
            await schema.validate(formData, { abortEarly: false });
            const result = await registerUser(formData);

            if (result.token) {
                localStorage.setItem('token', result.token);
                navigate('/');
            } else {
                setSubmitError(result.message || 'Registration failed');
            }
        } catch (error) {
            if (error.inner) {
                error.inner.forEach(err => {
                    setError(err.path, {
                        type: 'manual',
                        message: err.message
                    });
                });
            } else {
                setSubmitError(error.message || 'An error occurred during registration');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='auth-page page'>
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
                    <h1 className='page-headline'>Welcome in!</h1>
                    <div className='input-form'>
                        <div className='input-set'>
                            <div className='input-field'>
                                <label htmlFor="email">Email</label>
                                <input type="text" className='input-field' />
                            </div>
                        </div>

                        <div className='input-set'>
                            <div className='input-field'>
                                <label htmlFor="username">Username</label>
                                <input type="text" className='input-field' />
                            </div>
                        </div>

                        <div className='input-set'>
                            <div className='input-field'>
                                <label htmlFor="password">Password</label>
                                <input type="password" className='input-field' />
                            </div>
                        </div>

                        <div className='input-set'>
                            <div className='input-field'>
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input type="password" className='input-field' />
                            </div>
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