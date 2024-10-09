import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        globals: true, // Activez les options globales pour Vitest
        environment: 'jsdom', // Spécifiez l'environnement de test
        setupFiles: './setupTests.js', // Ajoutez le chemin de votre fichier setupTests
    },
});