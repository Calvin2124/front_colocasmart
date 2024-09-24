import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import logoGreen from '../../assets/img/ColocaSmartGreen.webp';
import '../header/header.scss';

export default function Header() {
const [isMenuOpen, setIsMenuOpen] = useState(false);

return (
    <>
    <header id="headerNonConnect">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/">
            <img src={logoGreen} alt="logo" className="h-20 w-20 sm:h-32 sm:w-32" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4">
            <ul className="flex gap-3">
            <li><Link className="cursor-pointer" to="/">Accueil</Link></li>
            <li><Link className="cursor-pointer" to="">A propos</Link></li>
            <li><Link className="cursor-pointer" to="/">Contact</Link></li>
            <li><Link className="btnLogin cursor-pointer" to="/login">Se connecter</Link></li>
            <li><Link className="btnRegister cursor-pointer" to="/register">S'inscrire</Link></li>
            </ul>
        </nav>

        {/* Mobile Menu Icon */}
        <Menu 
            className="h-6 w-6 md:hidden cursor-pointer" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
        />
        </div>

        {/* Mobile Menu (shown when the icon is clicked) */}
        {isMenuOpen && (
        <div id="menu-mobile" className="md:hidden px-4 h-max py-2 bg-white">
            <ul id="list-hidden">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
            <li><Link to="" onClick={() => setIsMenuOpen(false)}>A propos</Link></li>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            <li><Link className="btnLogin" to="/login" onClick={() => setIsMenuOpen(false)}>Se connecter</Link></li>
            <li><Link className="btnRegister" to="/register" onClick={() => setIsMenuOpen(false)}>S'inscrire</Link></li>
            </ul>
        </div>
        )}
    </header>
    </>
);
}