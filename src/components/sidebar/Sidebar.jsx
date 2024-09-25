import { Link } from "react-router-dom";
import GroupList from "../groupList/GroupList";
import './sidebar.scss';

export default function Sidebar({title, btnAdd, listName}) {
    const titleSidebar = title;
    const btnSidebar = btnAdd;
    return (
        <>
        <aside>
            <div className="profil">
                <div className="round"></div>
                {titleSidebar.toLowerCase() === 'groupe' ? (
                    <h1 className="text-3xl">Bienvenue <br /> <span className="nameUser">Calvin</span></h1>
                    ) : (
                        <h1 className="text-3xl"> Nom du groupe ici</h1>
                    )}
            </div>
            <hr/>
            <GroupList
                title={titleSidebar}
                bouton={btnSidebar}
                listName={listName}
            />
            <hr/>
            {titleSidebar.toLowerCase() === 'groupe' && (
                <Link className="disconnect" href="/">Déconnexion</Link>
                )}
        </aside>
        </>
    )
}