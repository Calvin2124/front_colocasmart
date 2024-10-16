import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footerWhite/Footer';
import '../styles/registerLogin.scss';
import { X } from 'lucide-react';
import loginImg from '../assets/img/login.webp';
import HeaderGreen from '../components/headerGreen/HeaderGreen';
import { post } from '../ApiService';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../Store/useUserStore'; // Importation du store Zustand

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    
    const setUser = useUserStore((state) => state.setUser); // Utilisation de la fonction setUser du store
    const loadUser = useUserStore((state) => state.loadUser); // Charger utilisateur depuis le store Zustand
    
    // Charger les informations utilisateur depuis sessionStorage ou localStorage à l'initialisation du composant
    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await post('auth/login', {
                email,
                password,
            });
            
            if (data.message === true) {
                const userParam = {
                    id: data.idUser,
                    username: data.username,
                    token: data.token,
                };

                // Stocker les informations utilisateur dans Zustand avec "rememberMe"
                setUser(userParam, rememberMe);

                // Redirection après connexion réussie
                navigate('/connected');
                return;
            }
        } catch (error) {
            console.error(error);
            setError("Mail ou mot de passe incorrect");
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
                                <h2 className='text-4xl'>Se connecter</h2>
                                <form action="#" onSubmit={handleSubmit}>
                                    {error && <p className='text-red-500'>{error}</p>}
                                    
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        placeholder="Email" 
                                        required
                                    />
                                    
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        placeholder="Password" 
                                        required
                                    />
                                    
                                    <Link className='text-blue-500' to="/forgot">Mot de passe oublié ?</Link>
                                    <p>Vous n'avez pas de compte ? <Link className='text-blue-500' to="/register">S'inscrire</Link></p>
                                    <div>
                                        <input 
                                            type="checkbox" 
                                            id="souvenir" 
                                            name="souvenir" 
                                            checked={rememberMe} 
                                            onChange={(e) => setRememberMe(e.target.checked)} 
                                        />
                                        <label htmlFor="souvenir">Se souvenir de moi</label>
                                    </div>
                                    <button className="btnBlue">Log in</button>
                                </form>
                            </div>
                            
                            <img src={loginImg} alt="login" />
                        </div>
                    </div>
                </section>
            </main>
        
            <Footer />
        </>
    );
}