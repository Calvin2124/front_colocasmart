import { useNavigate } from "react-router-dom";
import { LogOut, Users } from "lucide-react";
import './groupCard.scss';
import {post} from "../../ApiService";

export default function GroupCard({ group, fetchGroups }) {
    const navigate = useNavigate(); // Initialisation de useNavigate
    // Récupérer l'id de l'utilisateur dans le locale storage 
    const userId = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

    const handleEnterClick = () => {
        const groupData = {
            name: group.name,
            id: group.id
        };
        localStorage.setItem('group', JSON.stringify(groupData));
        navigate(`/homegroup/${group.id}`); // Redirige vers la page du groupe (exemple d'URL)
    };

    const handleLogOutGroup = async () => {
        try{
            const res = await post('group/leave', {
                groupId: group.id,
                userId: userId.id
            });
            fetchGroups();
        }catch (err){
            console.error(err);
        }


    }

    return (
        <>
            <article className="articleGroup flex flex-col gap-5 p-5 h-fit">
                <div className="flex justify-between">
                <LogOut className="pointer" onClick={handleLogOutGroup}/>
                <div className="numberUser flex items-center">
                    <p>+ {group.userCount}</p>
                    <Users />
                </div>
                </div>
                <h2 className="text-2xl text-center">{group.name}</h2>
                <hr />
                <button className="btnEnter" onClick={handleEnterClick}>Entrer</button>
            </article>
        </>
    )
}