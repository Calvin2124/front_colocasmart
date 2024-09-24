import { Link } from 'react-router-dom';
import logoBlack from '../assets/img/logoBlack.webp';
import Footer from '../components/footerWhite/Footer';
import '../styles/registerLogin.scss';
import { X } from 'lucide-react';
import { useState } from 'react';
import registerImg from '../assets/img/register.webp'

export default function Register() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [rgpd, setRgpd] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userName, email, password, confirmPassword);
    };
    return (
        <>
            <header className='headerRegisterLogin'>
                <Link className='flex justify-center' to="/"><img src={logoBlack} alt="logo" className="h-32 w-32" /></Link>
            </header>
            <main>
                <section className='formRegisterLogin py-36 px-5'>
                    <div className='divForm max-w-7xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 lg:px-8'>
                        <Link to='/' className='btnClose'>
                            <X />
                        </Link>
                        <div className='grid grid-cols-1 gap-4 items-center lg:grid-cols-2'>
                            <div className='flex flex-col items-center gap-4'>
                                <h2 className='text-4xl'>Inscription</h2>
                            <form 
                            action="#"
                            onSubmit={handleSubmit}
                            >
                                <input 
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    type="text" 
                                    id="userName" 
                                    name="userName" 
                                    placeholder="Username" 
                                    required/>
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
                                <input 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password" 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    placeholder="Confirm password" 
                                    required/>
                                <p>You already have an account? <Link className='text-blue-500' to="/login">Login</Link></p>
                                <div>
                                    <input type="checkbox" id="rgpd" name="rgpd" required/>
                                    <label htmlFor="rgpd">I accept the <Link className='text-blue-500' to="utilisation.html">terms of use</Link> and the <Link className='text-blue-500' to="#">privacy policy</Link></label>
                                </div>
                                <button className="btnBlue">Sign up</button>
                            </form>
                            </div>
                            
                            <img src={registerImg} alt="register" />
                        </div>
                    </div>
                </section>
            </main>
        
            <Footer />
        </>
    )
}