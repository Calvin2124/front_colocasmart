import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';
import * as router from 'react-router-dom';
import { post } from '../ApiService';
import { vi } from 'vitest';

vi.mock('../ApiService', () => ({
    post: vi.fn(),
}));

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate,
    };
});

const renderWithRouter = (ui, { route = '/' } = {}) => {
    return render(
        <MemoryRouter initialEntries={[route]}>
            {ui}
        </MemoryRouter>
    );
};

describe('Register Component', () => {
    beforeEach(() => {
        post.mockClear();
        mockedUsedNavigate.mockClear();
    });

    test('renders the registration form', () => {
        renderWithRouter(<Register />);

        expect(screen.getByPlaceholderText("Nom d'utilisateur")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Mot de passe")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Confirmer le mot de passe")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /s'inscrire/i })).toBeInTheDocument();
    });

    test('shows error message if passwords do not match', async () => {
        renderWithRouter(<Register />);

        fireEvent.change(screen.getByPlaceholderText("Nom d'utilisateur"), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText("Confirmer le mot de passe"), { target: { value: 'differentpassword' } });
        
        fireEvent.click(screen.getByLabelText(/j'accepte les/i));
        fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

        await waitFor(() => {
            expect(screen.getByText('Les mots de passe ne correspondent pas')).toBeInTheDocument();
        });
    });

    test('shows error message if user already exists', async () => {
        post.mockResolvedValueOnce({ message: true });

        renderWithRouter(<Register />);

        fireEvent.change(screen.getByPlaceholderText("Nom d'utilisateur"), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText("Confirmer le mot de passe"), { target: { value: 'password123' } });

        fireEvent.click(screen.getByLabelText(/j'accepte les/i));
        fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

        await waitFor(() => {
            expect(screen.getByText("L'utilisateur existe déjà")).toBeInTheDocument();
        });
    });

    test('redirects to login on successful registration', async () => {
        post.mockResolvedValueOnce({ message: false });

        renderWithRouter(<Register />);

        fireEvent.change(screen.getByPlaceholderText("Nom d'utilisateur"), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText("Confirmer le mot de passe"), { target: { value: 'password123' } });

        fireEvent.click(screen.getByLabelText(/j'accepte les/i));
        fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
        });
    });
});