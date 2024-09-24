import { Link } from 'react-router-dom';
import logoBlack from '../assets/img/logoBlack.webp';
import Footer from '../components/footerWhite/Footer';
import '../styles/registerLogin.scss';
import { X } from 'lucide-react';
import { useState } from 'react';
import forgotImg from '../assets/img/forgotPass.webp'

export default function Register() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log( email, password);
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
                                <h2 className='text-4xl'>Mot de passe oublié ?</h2>
                                <form action="#" onSubmit={handleSubmit}>
                                    <p>Vous avez oublié votre mot de passe ? Pas de souci ! Entrez votre adresse e-mail ci-dessous et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
                                    <input 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        placeholder="Email" 
                                        required/>
                                    <button className="btnBlue m-auto">Envoyer</button>
                                </form>
                            </div>
                            
                            <img src={forgotImg} alt="forgot" />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}