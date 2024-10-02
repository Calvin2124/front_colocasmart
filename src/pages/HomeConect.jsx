import { Link } from 'react-router-dom';
import logoBlack from '../assets/img/logoBlack.webp';
import '../styles/homeConnected.scss';
import GroupCard from '../components/groupCard/GroupeCard';
import Sidebar from '../components/sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { post } from '../services/ApiService';

export default function HomeConect() {
    const session = sessionStorage.getItem('user');
    const title = 'Groupe';
    const listName = ['un test 1', 'Groupe 2', 'Groupe 3', 'Groupe 4'];
    const btnAdd = 'Add';
    const sessionToken = JSON.parse(session);

    // États pour gérer les données, les erreurs et le chargement
    const [datas, setDatas] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await post('/home/connected', {
                    id: sessionToken.id,
                }, sessionToken.token);
                
                setDatas(result); // Stockez les données si la réponse est positive
                setLoading(false); // Arrêtez le chargement
            } catch (error) {
                console.error(error);
                setError('Une erreur est survenue lors de la récupération des données.'); // Message d'erreur générique
                setLoading(false); // Arrêtez le chargement
            }
        };

        fetchData(); // Appel de la fonction pour récupérer les données
    }, []);

    // Affichage conditionnel en fonction des états
    if (loading) {
        return (<div className='loaderCenter'>
                    <div className="loader">
                        <span className="loader-text">loading</span>
                        <span className="load"></span>
                    </div>  
                </div>
        ); // Affiche un message de chargement pendant la récupération

    }

    if (error) {
        return (<p>Une erreur est survenue lors de la récupération des données.</p>
        );
    }

    return (
        <>
            <header className='headerHomeConnect'>
                <Link className='flex justify-center' to="/">
                    <img src={logoBlack} alt="logo" className="h-32 w-32" />
                </Link>
            </header>
            <main id='mainconnect'>
                <section>
                    <div className="contentConnected">
                        <Sidebar
                            title={title}
                            btnAdd={btnAdd}
                            listName={datas}
                            username={JSON.parse(session).username}
                        />
                        <section id='sectionGroup'>
                            {/* Si aucun groupe n'est connecté on affiche le message "Vous n'avez aucun groupe connecté" */}
                            {datas.length === 0 && (
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-2xl">Vous n'avez aucun groupe connecté</p>
                                </div>
                            )}
                            {/* Si des groupes existent faire un map */}
                            {datas.map((data) => (
                                <GroupCard key={data.id} group={data} />
                            ))}
                            
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
