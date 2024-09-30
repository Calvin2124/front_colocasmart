import { Link } from 'react-router-dom';
import Footer from '../components/footerWhite/Footer';
import '../styles/registerLogin.scss';
import { X } from 'lucide-react';
import { useState } from 'react';
import registerImg from '../assets/img/register.webp'
import HeaderGreen from '../components/headerGreen/HeaderGreen';

export default function Register() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [rgpd, setRgpd] = useState(false);
    const [password_hash, setPasswordHash] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passError, setPassError] = useState('');
    const [mailError, setMailError] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, email, password_hash, confirmPassword);
        if (password_hash !== confirmPassword) {
            setPassError('Passwords do not match');
        } else {
            setPassError('');
            try {
                console.log(username, email, password_hash);
                setError('');
                const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password_hash,
                    }),
                });
                const data = await response.json();
                console.log(data);
                // Si le mail exist deja dans la base de données
                if (data.message === true) {
                    setMailError('User already exist');
                } else {
                    // Si le mail n'exist pas dans la base de données
                    setMailError('');
                    window.location.href = '/login';
                }
            
            } catch (error) {
                console.error(error);
            }
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
                            <form 
                            action="#"
                            onSubmit={handleSubmit}
                            >
                                <input 
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    type="text" 
                                    id="userName" 
                                    name="userName" 
                                    placeholder="Username" 
                                    required/>
                                    {mailError && <p className='text-red-500'>{mailError}</p>}
                                <input 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="Email" 
                                    required/>
                                    {passError && <p className='text-red-500'>{passError}</p>}
                                <input 
                                    value={password_hash}
                                    onChange={(e) => setPasswordHash(e.target.value)}
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
                                    <input type="checkbox" id="rgpd" name="rgpd"/>
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