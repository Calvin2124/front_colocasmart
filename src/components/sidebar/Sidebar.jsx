import { Link, useNavigate } from "react-router-dom";
import GroupList from "../groupList/GroupList";
import './sidebar.scss';

export default function Sidebar({ title, btnAdd, username }) {
    // const groupId = window.location.pathname.split('/')[2];
    const titleSidebar = title;
    const btnSidebar = btnAdd;
    const navigate = useNavigate();

    const handleDeconnect = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        navigate("/login"); // Utilise navigate pour rediriger
    };

    const handleHome = (e) => {
        e.preventDefault();
        navigate("/connected"); // Utilise navigate pour rediriger
    };

    return (
        <>
            <aside>
                <div className="profil">
                    <div className="round"></div>
                    {titleSidebar.toLowerCase() === 'groupe' ? (
                        <h1 className="text-3xl">Bienvenue <br /> <span className="nameUser">{username}</span></h1>
                    ) : (
                        <h1 className="text-3xl">test</h1>
                    )}
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