import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import './groupCard.scss';

export default function GroupCard({ group }) {
    const navigate = useNavigate(); // Initialisation de useNavigate

    const handleEnterClick = () => {
        localStorage.setItem('groupName', group.name);
        navigate(`/homegroup/${group.id}`); // Redirige vers la page du groupe (exemple d'URL)
    };

    return (
        <>
            <article className="articleGroup flex flex-col gap-5 p-5 h-fit">
                <div className="numberUser flex justify-end items-center">
                    <p>+4</p>
                    <Users />
                </div>
                <h2 className="text-2xl text-center">{group.name}</h2>
                <hr />
                <button className="btnEnter" onClick={handleEnterClick}>Entrer</button>
            </article>
        </>
    )
}