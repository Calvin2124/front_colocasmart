import { Link } from "react-router-dom";
import './groupList.scss';
import { useState } from "react";
import ModalGroup from "../modalGroup/ModalGroup";

export default function GroupList({ title, bouton, datas }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
        <div className="groupAside">
            <h2 className="text-4xl mb-5">{title}</h2>
            <ul>
                {datas.map((data, index) => (
                    <li key={index}>
                        <Link className="groupName" to="/">
                            {data.group.name}
                        </Link>
                    </li>
                ))}
                    <ModalGroup isOpen={isOpen} setIsOpen={setIsOpen} bouton={bouton} title={title}/>
            </ul>
            
        </div>
        </>
    );
}