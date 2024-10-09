import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from './Contact';

// Mock du `fetch` pour éviter les appels réels à l'API
global.fetch = jest.fn(() =>
Promise.resolve({
    ok: true,
})
);

describe('Contact Component', () => {
beforeEach(() => {
    fetch.mockClear();
});

test('renders form inputs and submits data correctly', async () => {
    render(<Contact />);

    // Vérifier que les éléments du formulaire sont bien présents
    const usernameInput = screen.getByPlaceholderText('Nom');
    const emailInput = screen.getByPlaceholderText('Email');
    const messageTextarea = screen.getByPlaceholderText('Message');
    const rgpdCheckbox = screen.getByLabelText(/j'accepte que mes données personnelles/i);
    const submitButton = screen.getByRole('button', { name: /envoyer/i });

    // Simuler la saisie des valeurs dans le formulaire
    fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageTextarea, { target: { value: 'Hello, this is a test message.' } });
    fireEvent.click(rgpdCheckbox); // cocher la case RGPD

    // Simuler la soumission du formulaire
    fireEvent.click(submitButton);

    // Vérifier que la fonction fetch a été appelée avec les bonnes données
    await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);

    // Vérification du payload envoyé dans la requête fetch
    expect(fetch).toHaveBeenCalledWith(
        'https://discord.com/api/webhooks/1288044432171728937/qZBU371r6Ydsw6fFvblgrIrsCAuLcmfKtoC9mK1d8iIHcAxGzc-oIU30QZ56hXnT6WEz',
        expect.objectContaining({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: 'Nouveau message du formulaire',
            embeds: [{
            title: 'Détails du message',
            fields: [
                { name: 'Nom', value: 'John Doe' },
                { name: 'Email', value: 'john@example.com' },
                { name: 'Message', value: 'Hello, this is a test message.' },
            ],
            }],
        }),
        })
    );
    });

    // Vérifier que les champs ont été réinitialisés après soumission
    expect(usernameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(messageTextarea.value).toBe('');
    expect(rgpdCheckbox.checked).toBe(false);
});
});