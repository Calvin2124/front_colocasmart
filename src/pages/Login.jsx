import { Link } from 'react-router-dom';
import logoBlack from '../assets/img/logoBlack.webp';
import Footer from '../components/footerWhite/Footer';
import '../styles/registerLogin.scss';
import { X } from 'lucide-react';
import { useState } from 'react';
import loginImg from '../assets/img/login.webp'
import HeaderGreen from '../components/headerGreen/HeaderGreen';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log( email, password);
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
                                    <input 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        placeholder="Email" 
                                        required/>
                                    <input 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        placeholder="Password" 
                                        required/>
                                    <Link className='text-blue-500' to="/forgot">Mot de passe oublié ?</Link>
                                    <p>Vous n'avez pas de compte ? <Link className='text-blue-500' to="/register">S'inscrire</Link></p>
                                    <div>
                                        <input type="checkbox" id="souvenir" name="souvenir" required/>
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
    )
}