import React, { useState } from 'react';
import './formProfil.scss';

export default function FormProfil({ afficher }) {
const [nom, setNom] = useState('');
const [prenom, setPrenom] = useState('');
const [email, setEmail] = useState('');
const [ancienMotDePasse, setAncienMotDePasse] = useState('');
const [nouveauMotDePasse, setNouveauMotDePasse] = useState('');
const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');
const [message, setMessage] = useState('');

const handleProfilSubmit = (e) => {
    e.preventDefault();
    // Logique pour soumettre le nom, le prénom et l'e-mail
    setMessage('Profil mis à jour avec succès');
};

const handleMotDePasseSubmit = (e) => {
    e.preventDefault();
    if (nouveauMotDePasse !== confirmationMotDePasse) {
    setMessage('Les mots de passe ne correspondent pas');
    return;
    }
    // Logique pour soumettre le nouveau mot de passe
    setMessage('Mot de passe mis à jour avec succès');
};

return (
    <div className="space-y-6 max-w-md mx-auto p-6">
    {afficher === "edit" && (
        <div className="container-color shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Modifier le profil</h2>
        <form onSubmit={handleProfilSubmit} className="space-y-4">
            <div>
            <label htmlFor="nom" className="block text-gray-700 text-sm font-bold mb-2">
                Nom
            </label>
            <input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            <div>
            <label htmlFor="prenom" className="block text-gray-700 text-sm font-bold mb-2">
                Prénom
            </label>
            <input
                id="prenom"
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Adresse e-mail
            </label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Mettre à jour le profil
            </button>
        </form>
        </div>
    )}

    {afficher === "account" && (
        <div className="container-color shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Modifier le mot de passe</h2>
        <form onSubmit={handleMotDePasseSubmit} className="space-y-4">
            <div>
            <label htmlFor="ancien-mdp" className="block text-gray-700 text-sm font-bold mb-2">
                Ancien mot de passe
            </label>
            <input
                id="ancien-mdp"
                type="password"
                value={ancienMotDePasse}
                onChange={(e) => setAncienMotDePasse(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            <div>
            <label htmlFor="nouveau-mdp" className="block text-gray-700 text-sm font-bold mb-2">
                Nouveau mot de passe
            </label>
            <input
                id="nouveau-mdp"
                type="password"
                value={nouveauMotDePasse}
                onChange={(e) => setNouveauMotDePasse(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            <div>
            <label htmlFor="confirmation-mdp" className="block text-gray-700 text-sm font-bold mb-2">
                Confirmer le nouveau mot de passe
            </label>
            <input
                id="confirmation-mdp"
                type="password"
                value={confirmationMotDePasse}
                onChange={(e) => setConfirmationMotDePasse(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Changer le mot de passe
            </button>
        </form>
        </div>
    )}

    {message && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
        <p>{message}</p>
        </div>
    )}
    </div>
);
}