import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
import './groupList.scss';
import { useState } from "react";
import ModalGroup from "../modalGroup/ModalGroup";

export default function GroupList({ title, bouton, listName }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
        <div className="groupAside">
            <h2 className="text-4xl mb-5">{title}</h2>
            <ul>
                {listName.map((group, index) => (
                    <li key={index}>
                        <Link className="groupName" to="/">
                            {group}
                        </Link>
                    </li>
                ))}
                    <ModalGroup isOpen={isOpen} setIsOpen={setIsOpen} bouton={bouton}/>
            </ul>
            
        </div>
        </>
    );
}