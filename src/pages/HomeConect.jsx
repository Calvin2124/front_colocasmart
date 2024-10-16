import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoBlack from '../assets/img/logoBlack.webp';
import '../styles/homeConnected.scss';
import GroupCard from '../components/groupCard/GroupeCard';
import Sidebar from '../components/sidebar/Sidebar';
import useUserStore from '../Store/groupUserStore';
import Footer from '../components/footer/Footer';

export default function HomeConnect() {
    const { sessionToken, groups, error, loading, setSessionToken, fetchGroups } = useUserStore();

    useEffect(() => {
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            console.log(userData);
            setSessionToken(userData);
        }
    }, []);

    useEffect(() => {
        if (sessionToken) {
            fetchGroups();
        }
    }, [sessionToken, fetchGroups]);

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
                        username={sessionToken?.username}
                    />
                    <section id='sectionGroup'>
                        {groups && groups.length === 0 ? (
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-2xl">Vous n'avez aucun groupe connecté</p>
                            </div>
                        ) : (
                            groups && groups.map((data) => (
                                <GroupCard key={data.id} group={data} />
                            ))
                        )}
                    </section>
                </div>
            </section>
        </main>
        <Footer />
        </>
    );
}