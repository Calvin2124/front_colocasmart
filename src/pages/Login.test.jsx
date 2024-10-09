// Login.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login'; // Assurez-vous que ce chemin d'importation est correct
import { post } from '../ApiService';
import * as router from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../ApiService', () => ({
    post: vi.fn(),
}));

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedUseNavigate,
    };
});

describe('Login Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should render the login form', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
        expect(screen.getByText(/se connecter/i)).toBeInTheDocument();
    });

    test('should display an error message with wrong credentials', async () => {
        post.mockRejectedValueOnce(new Error('Login failed'));

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongPassword' } });
        fireEvent.click(screen.getByRole('button', { name: /log in/i }));

        await waitFor(() => {
            expect(screen.getByText(/mail ou mot de passe incorrect/i)).toBeInTheDocument();
        });
    });

    test('should navigate to the connected page on successful login', async () => {
        post.mockResolvedValueOnce({
            message: true,
            idUser: 1,
            username: 'testuser',
            token: 'fake_token',
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'correct@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'correctPassword' } });
        fireEvent.click(screen.getByRole('button', { name: /log in/i }));

        await waitFor(() => {
            expect(mockedUseNavigate).toHaveBeenCalledWith('/connected');
        });
    });
});