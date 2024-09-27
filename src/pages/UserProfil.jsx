import { Link } from "react-router-dom";
import logoBlack from '../assets/img/logoBlack.webp';
import { UserRoundCog, UserRoundPen } from "lucide-react";
import { useState } from "react";
import FormProfil from "../components/formProfil/FormProfil";

export default function UserProfil() {
    const[afficher, setAfficher] = useState('edit');
    const handleClickProfile = (e) => {
        e.preventDefault();
        setAfficher('edit');
    };
    const handleClickAccount = (e) => {
        e.preventDefault();
        setAfficher('account');
    };
    return (
        <>
        <header className='headerHomeConnect'>
            <Link className='flex justify-center' to="/"><img src={logoBlack} alt="logo" className="h-32 w-32" /></Link>
        </header>
        <main id='mainconnect'>
            <section>
                <div className="contentConnected">
                <aside>
                    <div className="profil">
                        <div className="round"></div>
                        <h1>Profil</h1>
                    </div>
                    <hr/>
                    <Link className="hover:text-purple-600 transition-all flex gap-1 items-center mb-8" onClick={handleClickProfile} to="/"><UserRoundPen /> Mon profil</Link>
                    <Link className="hover:text-purple-600 transition-all flex gap-1 items-center" onClick={handleClickAccount} to="/"><UserRoundCog /> Mon compte</Link>
                    <hr/>
                    <Link className="disconnect" to="/">Retour</Link>
                </aside>
                    <section id='sectionGroup'>
                    <FormProfil afficher={afficher} />
                    </section>
                </div>
            </section>
        </main>
        <footer id="footerGreen">
            <div className="max-w-7xl mx-auto flex flex-col py-10 gap-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-around items-center">
                    <Link to="/"><img src={logoBlack} alt="logo" className="h-32 w-32" /></Link>
                    <div id="listUl" className="flex flex-col lg:flex-row gap-10">
                        <ul className="leading-10">
                            <li className="text-xl">Navigation</li>
                            <li><Link href="#">À propos de nous</Link></li>
                            <li><Link href="#">FAQ</Link></li>
                            <li><Link href="#">Contact</Link></li>
                        </ul>
                        <ul className="leading-10">
                            <li className="text-xl">Politique</li>
                            <li><Link href="utilisation.html">Condition d'utilisation</Link></li>
                            <li><Link href="#">Politique de confidentialité</Link></li>
                            <li><Link href="mentions.html">Mentions légales</Link></li>
                        </ul>
                    </div>
                </div>
                <p className="text-center">© 2024 ColocaSmart. Tous droits réservés.</p>
            </div>
        </footer>
        </>
    )
}