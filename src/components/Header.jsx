import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import logoGreen from '../assets/img/ColocaSmartGreen.webp';

export default function Header() {
return (
    <>
        <header>
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/"><img src={logoGreen} alt="logo" className="h-32 w-32" /></Link>
                <nav className="flex items-center space-x-4">
                    <ul className="flex gap-3">
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="">A propos</Link></li>
                        <li><Link to="">Contact</Link></li>
                        <li><Link className="btnLogin" to="/">Se connecter</Link></li>
                        <li><Link className="btnRegister" to="/">S'inscrire</Link></li>
                    </ul>
                    <Menu className="h-6 w-6 hidden" />
                </nav>
            </div>
        </header>
    </>
);
}