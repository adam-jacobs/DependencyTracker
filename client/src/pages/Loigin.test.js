import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
    
    test('renders login form with email and password inputs and submit button', () => {
        render(<Login />);

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    })

    test('allows user to type into email and password fields', () => {
        render(<Login />);

        const emailInput = screen.getByPlaceholderText(/enter your email/i);
        const passwordInput = screen.getByPlaceholderText(/enter your password/i);

        fireEvent.change(emailInput, { target: {value: 'test@example.com'}});
        fireEvent.change(passwordInput, {target: {value: 'password123'}});

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    })

    test('renders sign-up link', () => {
        render(<Login/>)

        const signUpLink = screen.getByText(/sign up/i);
        expect(signUpLink).toBeInTheDocument();
        expect(signUpLink.closest('a')).toHaveAttribute('href', '/signup');
    });
})