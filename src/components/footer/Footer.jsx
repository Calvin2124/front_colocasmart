import React from 'react'; // Ajoutez cette ligne
import { Link } from "react-router-dom";
import logoBlack from "../../assets/img/logoBlack.webp";
import '../footer/footer.scss';

export default function Footer() {
    return (
        <>
            <footer id="footerGreen">
                <div className="max-w-7xl mx-auto flex flex-col py-10 gap-8 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-around items-center">
                        <Link to="/">
                            <img src={logoBlack} alt="logo" className="h-32 w-32" />
                        </Link>
                        <div id="listUl" className="flex flex-col lg:flex-row gap-10">
                            <ul className="leading-10">
                                <li className="text-xl">Navigation</li>
                                <li><Link to="#">À propos de nous</Link></li>
                                <li><Link to="#">FAQ</Link></li>
                                <li><Link to="#">Contact</Link></li>
                            </ul>
                            <ul className="leading-10">
                                <li className="text-xl">Politique</li>
                                <li><Link to="utilisation.html">Condition d'utilisation</Link></li>
                                <li><Link to="#">Politique de confidentialité</Link></li>
                                <li><Link to="mentions.html">Mentions légales</Link></li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-center">© 2024 ColocaSmart. Tous droits réservés.</p>
                </div>
            </footer>
        </>
    );
}