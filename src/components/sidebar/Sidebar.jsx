import { Link } from "react-router-dom";
import GroupList from "../groupList/GroupList";
import './sidebar.scss';
import { post } from "../../ApiService";
import { useState, useEffect } from "react";

export default function Sidebar({ title, btnAdd, listName, username, onGroupAdded }) {
    const [dataGroup, setDataGroup] = useState(null); // Stockage du groupe récupéré
    const [dataGroupList, setDataGroupList] = useState(null); // Stockage de la liste des groupes de l'utilisateur
    const groupId = window.location.pathname.split('/')[2];
    const titleSidebar = title;
    const btnSidebar = btnAdd;
    const userSession = sessionStorage.getItem('user');  


    // Fnction pour récupérer la liste des groupes de l'utilisateur
    const fetchGroupList = async () => {
        try {
            const data = await post(`group/list`, {
                id: JSON.parse(userSession).id,
            });
            console.log('Les données de la liste des groupes sont :', data);
            setDataGroupList(data);
        } catch (error) {
            console.error("Erreur lors de la récupération de la liste des groupes", error);
        }
    };

    // Fonction pour récupérer les données du groupe
    const fetchGroupData = async (groupId) => {
        if (titleSidebar.toLowerCase() !== 'groupe') {
            console.log('mauvais if pour cette page')
            try {
                const data = await post(`group/${groupId}`, {
                    id: groupId,
                });
                console.log(data);
                setDataGroup(data); // Stocker les données du groupe
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

    // Utilisation de useEffect pour éviter la boucle infinie
    // useEffect(() => {
    //     if (userSession) {
    //         fetchGroupList(); // Appelle la fonction quand le component est monté ou quand userSession change
    //     }
    // }, [userSession]); // Dépendance sur userSession

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
                        <h1 className="text-3xl">{dataGroup ? dataGroup.name : "Chargement..."}</h1>
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