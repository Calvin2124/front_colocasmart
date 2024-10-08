import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoBlack from '../assets/img/logoBlack.webp';
import '../styles/homeConnected.scss';
import GroupCard from '../components/groupCard/GroupeCard';
import Sidebar from '../components/sidebar/Sidebar';
import { post } from '../ApiService';

export default function HomeConnect() {
    const [sessionToken, setSessionToken] = useState(null);  // État pour stocker le sessionToken
    const [datas, setDatas] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Utiliser useEffect pour récupérer sessionToken au montage
    useEffect(() => {
        const session = sessionStorage.getItem('user');
        const token = JSON.parse(session);
        setSessionToken(token);  // Assigner le token à un état local une seule fois
    }, []);  // Exécuté une seule fois au montage du composant

    useEffect(() => {
        const fetchData = async () => {
            if (!sessionToken) return;  // Ne pas continuer si sessionToken n'est pas encore disponible

            setLoading(true);
            try {
                const data = await post('home/connected', {
                    id: sessionToken.id
                }, sessionToken.token);
                console.log(data)
                setDatas(data);
                setError(null);
            } catch (error) {
                console.error(error);
                setError('Une erreur est survenue lors de la récupération des données.');
            } finally {
                setLoading(false);
            }
        };

        // Appel de la fonction uniquement si sessionToken est défini
        fetchData();
    }, [sessionToken]); // On exécute fetchData uniquement quand sessionToken change, mais il ne changera qu'une seule fois après le montage

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
        return <p>{error}</p>;
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
                        title="Groupe"
                        btnAdd="Add"
                        listName={datas}
                        username={sessionToken?.username} // Utilisation de sessionToken ici
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
        </>
    );
}