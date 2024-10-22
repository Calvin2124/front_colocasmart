import { Link, useNavigate } from "react-router-dom";
import GroupList from "../groupList/GroupList";
import './sidebar.scss';
import { Settings } from "lucide-react";
import { useState, useEffect } from "react";

export default function Sidebar({ title, btnAdd, username }) {
    const titleSidebar = title;
    const btnSidebar = btnAdd;
    const navigate = useNavigate();
    const [nameGroup, setNameGroup] = useState('');

    // Utilisation de useEffect pour éviter les boucles infinies
    useEffect(() => {
        const groupData = localStorage.getItem("group");
        if (groupData) {
            const group = JSON.parse(groupData); // On parse les données du localStorage
            setNameGroup(group.name);
        }
    }, []); // Le tableau vide [] signifie que cet effet s'exécutera seulement une fois, lors du montage

    const handleProfil = (e) => {
        e.preventDefault();
        navigate("/userprofil");
    };

    const handleDeconnect = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        localStorage.clear();
        navigate("/login");
    };

    const handleHome = (e) => {
        e.preventDefault();
        localStorage.removeItem("group");
        navigate("/connected");
    };

    return (
        <>
            <aside>
                <div className="profil flex items-center gap-10 relative">
                    {titleSidebar.toLowerCase() === 'groupe' ? (
                        <h1 className="text-3xl">Bienvenue <br /> <span className="nameUser">{username}</span></h1>
                    ) : (
                        <h1 className="text-3xl">{nameGroup}</h1>
                    )}
                    <Settings onClick={handleProfil} className="w-8 h-8" />
                </div>
                <hr />
                <GroupList
                    title={titleSidebar}
                    bouton={btnSidebar}
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