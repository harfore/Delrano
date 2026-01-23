import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../pages/Auth/Login';
import { AuthContext } from '../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {

    const actual = jest.requireActual('react-router-dom');

    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Login Integration Test', () => {
    it('should complete the multi-step login successfully', async () => {

        // mocking API response
        const mockRes = {
            data: { token: 'fake-token', user: { id: 1, name: 'Test User' } }
        };
        axios.post.mockResolvedValueOnce(mockRes);

        const loginMock = jest.fn();

        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

        // render component with context and router
        render(
            <AuthContext.Provider value={{ login: loginMock }}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        // step 1 : email
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'user@example.com' } });
        fireEvent.click(screen.getByText(/next/i));

        // step 2 : password
        const passwordField = await screen.findByPlaceholderText(/password/i);

        fireEvent.change(passwordField, {
            target: { value: 'password123' }
        });
        fireEvent.click(screen.getByText(/login/i));

        // wait for API call and navigation
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:3000/api/auth/login',
                {
                    email: 'user@example.com',
                    password: 'password123'
                }
            );
            expect(loginMock).toHaveBeenCalledWith('fake-token', {
                id: 1, name: 'Test User'
            });
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });
});