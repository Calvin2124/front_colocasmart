import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Nécessaire pour les tests avec React Router
import Footer from './Footer'; // Assurez-vous d'importer le composant Footer
import '@testing-library/jest-dom'; // Assurez-vous que jest-dom est importé pour l'utilisation des matchers

describe('Footer Component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );
    });

    test('renders the logo image', () => {
        const logo = screen.getByAltText(/logo/i);
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', expect.stringContaining('logoBlack.webp')); // Vérifiez que le src contient le nom du fichier
    });

    test('renders navigation links', () => {
        const aboutLink = screen.getByText(/À propos de nous/i);
        const faqLink = screen.getByText(/FAQ/i);
        const contactLink = screen.getByText(/Contact/i);
        
        expect(aboutLink).toBeInTheDocument();
        expect(faqLink).toBeInTheDocument();
        expect(contactLink).toBeInTheDocument();
    });

    test('renders policy links', () => {
        const termsLink = screen.getByText(/Condition d'utilisation/i);
        const privacyPolicyLink = screen.getByText(/Politique de confidentialité/i);
        const legalNoticeLink = screen.getByText(/Mentions légales/i);
        
        expect(termsLink).toBeInTheDocument();
        expect(privacyPolicyLink).toBeInTheDocument();
        expect(legalNoticeLink).toBeInTheDocument();
    });

    test('renders the copyright text', () => {
        const copyrightText = screen.getByText(/© 2024 ColocaSmart. Tous droits réservés./i);
        expect(copyrightText).toBeInTheDocument();
    });
});