import { Link } from 'react-router-dom';
import logoBlack from '../assets/img/logoBlack.webp';
import '../styles/homeConnected.scss';
import GroupCard from '../components/groupCard/GroupeCard';
import Sidebar from '../components/sidebar/Sidebar';


export default function HomeConect() {
    const title = 'Groupe';
    const listName = ['un test 1', 'Groupe 2', 'Groupe 3', 'Groupe 4'];
    const btnAdd = 'Add';
return (
    <>
    <header className='headerHomeConnect'>
        <Link className='flex justify-center' to="/"><img src={logoBlack} alt="logo" className="h-32 w-32" /></Link>
    </header>
    <main id='mainconnect'>
        <section>
            <div className="contentConnected">
                <Sidebar
                    title={title}
                    btnAdd={btnAdd}
                    listName={listName}
                />
                <section id='sectionGroup'>
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
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
);
}