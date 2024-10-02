import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import logoBlack from '../assets/img/logoBlack.webp';
import '../styles/homeConnected.scss';
import GroupCard from '../components/groupCard/GroupeCard';
import Sidebar from '../components/sidebar/Sidebar';

export default function HomeConnect() {
    const session = sessionStorage.getItem('user');
    const title = 'Groupe';
    const btnAdd = 'Add';
    const sessionTokenRef = useRef(JSON.parse(session));

    const [datas, setDatas] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/home/connected', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionTokenRef.current.token}`,
                },
                body: JSON.stringify({
                    id: sessionTokenRef.current.id,
                }),
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            
            const result = await response.json();
            setDatas(result);
        } catch (error) {
            console.error(error);
            setError('Une erreur est survenue lors de la récupération des données.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleGroupAdded = useCallback(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return (
            <div className='loaderCenter'>
                <div className="loader">
                    <span className="loader-text">loading</span>
                    <span className="load"></span>
                </div>  
            </div>
        );
    }

    if (error) {
        return <p>Une erreur est survenue lors de la récupération des données.</p>;
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
                            onGroupAdded={handleGroupAdded}
                        />
                        <section id='sectionGroup'>
                            {datas && datas.length === 0 ? (
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-2xl">Vous n'avez aucun groupe connecté</p>
                                </div>
                            ) : (
                                datas && datas.map((data) => (
                                    <GroupCard key={data.id} group={data} />
                                ))
                            )}
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