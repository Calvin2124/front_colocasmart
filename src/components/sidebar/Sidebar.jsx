import { Link } from "react-router-dom";
import GroupList from "../groupList/GroupList";
import './sidebar.scss';
import { post } from "../../ApiService";
import { useState, useEffect } from "react";

export default function Sidebar({ title, btnAdd, listName, username, onGroupAdded }) {
    const [dataGroup, setDataGroup] = useState(null); // Stockage du groupe récupéré
    const groupId = window.location.pathname.split('/')[2];
    const titleSidebar = title;
    const btnSidebar = btnAdd;

    // Fonction pour récupérer les données du groupe
    const fetchGroupData = async (groupId) => {
        if (titleSidebar.toLowerCase() === 'groupe') {
            try {
                const data = await post(`group/${groupId}`, {
                    id: groupId,
                });
                setDataGroup(data); // Stocker les données du groupe
                console.log(data);
            } catch (error) {
                console.error("Erreur lors de la récupération du groupe", error);
            }
            return
        }
    };

    // Utilisation de useEffect pour éviter la boucle infinie
    useEffect(() => {
        if (groupId) {
            fetchGroupData(groupId); // Appelle la fonction quand le component est monté ou quand groupId change
        }
    }, [groupId]); // Dépendance sur groupId

    const handleDeconnect = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        window.location.replace("/login");
    };

    const handleHome = (e) => {
        e.preventDefault();
        window.location.replace("/connected");
    };

    return (
        <>
            <aside>
                <div className="profil">
                    <div className="round"></div>
                    {titleSidebar.toLowerCase() === 'groupe' ? (
                        <h1 className="text-3xl">Bienvenue <br /> <span className="nameUser">{username}</span></h1>
                    ) : (
                        <h1 className="text-3xl">{title}</h1>
                    )}
                </div>
                <hr />
                <GroupList
                    title={titleSidebar}
                    bouton={btnSidebar}
                    listName={listName}
                    onGroupAdded={onGroupAdded}
                />
                <hr />
                {titleSidebar.toLowerCase() === 'groupe' && (
                    <Link onClick={handleDeconnect} className="disconnect" href="/login">Déconnexion</Link>
                )}
                {titleSidebar.toLowerCase() === 'task' && (
                    <Link className="disconnect" onClick={handleHome} href="/connected">Home</Link>
                )}
            </aside>
        </>
    );
}