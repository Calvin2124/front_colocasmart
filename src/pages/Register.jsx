import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/footerWhite/Footer';
import '../styles/registerLogin.scss';
import { X } from 'lucide-react';
import registerImg from '../assets/img/register.webp';
import HeaderGreen from '../components/headerGreen/HeaderGreen';
import { post } from '../ApiService';

export default function Register() {
    const navigate = useNavigate(); // Utiliser useNavigate pour la redirection
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [rgpd, setRgpd] = useState(false);
    const [password_hash, setPasswordHash] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passError, setPassError] = useState('');
    const [mailError, setMailError] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // État de chargement

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password_hash !== confirmPassword) {
            setPassError('Les mots de passe ne correspondent pas');
            return;
        }

        setPassError('');
        setLoading(true); // Définir l'état de chargement

        try {
            if (!email.includes('@')) {
                setMailError('L\'adresse email doit contenir un @');
                return;
            }
            if (rgpd === false) {
                setError('Vous devez accepter les conditions générales.');
                return;
            }
            setError('');
            const data = await post('auth/register', {
                username,
                email,
                password_hash,
                rgpd
            });

            // Vérifiez si l'utilisateur existe déjà
            if (data.message === true) {
                setMailError('L\'utilisateur existe déjà');
                return;
            }

            // Effacer les erreurs existantes et rediriger
            setMailError('');
            navigate('/login'); // Utiliser navigate pour la redirection

        } catch (error) {
            console.error(error);
            setError('Mot de passe ou mail incorrect !'); // Message d'erreur générique
        } finally {
            setLoading(false); // Réinitialiser l'état de chargement
        }
    };

    return (
        <>
            <HeaderGreen />
            <main>
                <section className='formRegisterLogin py-36 px-5'>
                    <div className='divForm max-w-7xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 lg:px-8'>
                        <Link to='/' className='btnClose'>
                            <X />
                        </Link>
                        <div className='grid grid-cols-1 gap-4 items-center lg:grid-cols-2'>
                            <div className='flex flex-col items-center gap-4'>
                                <h2 className='text-4xl'>Inscription</h2>
                                <form action="#" onSubmit={handleSubmit}>
                                    <input
                                        value={username}
                                        onChange={(e) => setUserName(e.target.value)}
                                        type="text"
                                        id="userName"
                                        name="userName"
                                        placeholder="Nom d'utilisateur"
                                        required
                                    />
                                    {mailError && <p className='text-red-500'>{mailError}</p>}
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                    />
                                    {passError && <p className='text-red-500'>{passError}</p>}
                                    <input
                                        value={password_hash}
                                        onChange={(e) => setPasswordHash(e.target.value)}
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Mot de passe"
                                        required
                                    />
                                    <input
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Confirmer le mot de passe"
                                        required
                                    />
                                    <p>Vous avez déjà un compte ? <Link className='text-blue-500' to="/login">Connexion</Link></p>
                                    <div>
                                        <input 
                                            type="checkbox" 
                                            id="rgpd" 
                                            name="rgpd" 
                                            checked={rgpd} 
                                            onChange={(e) => setRgpd(e.target.checked)} // Gérer l'état de la case à cocher
                                        />
                                        <label htmlFor="rgpd">
                                            J'accepte les <Link className='text-blue-500' to="utilisation.html">conditions d'utilisation</Link> et la <Link className='text-blue-500' to="#">politique de confidentialité</Link>
                                        </label>
                                    </div>
                                    <button className="btnBlue" disabled={loading}> 
                                        {loading ? 'Inscription en cours...' : "S'inscrire"}
                                    </button>
                                    {error && <p className='text-red-500'>{error}</p>} {/* Afficher l'erreur générale */}
                                </form>
                            </div>
                            <img src={registerImg} alt="Inscription" />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}