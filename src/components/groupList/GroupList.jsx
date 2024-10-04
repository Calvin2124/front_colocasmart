import { Link, useNavigate } from "react-router-dom";
import './groupList.scss';
import { useState } from "react";
import ModalGroup from "../modalGroup/ModalGroup";

export default function GroupList({ title, bouton, listName, onGroupAdded}) {
    console.log(title)
    const [isOpen, setIsOpen] = useState(false);
    const datas = listName;
    const navigate = useNavigate(); // Initialisation de useNavigate

    const handleClick = (data) => {
        navigate(`/homegroup/${data}`); // Redirige vers la page du groupe (exemple d'URL)
    };
    return (
        <>
        <div className="groupAside">
            <h2 className="text-4xl mb-5">{title}</h2>
            <ul>
            {title.toLowerCase() === 'task' && (
                <ul>
                    {datas.map((data, index) => (
                        <li key={index}>
                            <Link to={`/group/${data}`} className="groupLink">
                                {data}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            {title.toLowerCase() === 'groupe' && (
                <ul>
                    {datas.map((data, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handleClick(data.id)} // Appelle handleClick avec l'ID du groupe
                                className="groupLink"
                            >
                                {data.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
                    <ModalGroup isOpen={isOpen} setIsOpen={setIsOpen} bouton={bouton} title={title} onGroupAdded={onGroupAdded}/>
            </ul>
            
        </div>
        </>
    );
}