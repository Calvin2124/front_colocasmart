import { Link, useNavigate } from "react-router-dom";
import './groupList.scss';
import { useState, useEffect } from "react";
import ModalGroup from "../modalGroup/ModalGroup";
import { get } from "../../ApiService";

export default function GroupList({ title, bouton, listName = null, onGroupAdded }) {
    const [isOpen, setIsOpen] = useState(false);
    const [tags, setTags] = useState([]);
    const datas = listName;
    const navigate = useNavigate();

    const fetchTags = async () => {
        try {
            const data = await get(`defaultTags/defaultTags`);
            setTags(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des tags", error);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    const handleClick = (data) => {
        navigate(`/homegroup/${data}`);
    };

    return (
        <div className="groupAside">
            <h2 className="text-4xl mb-5">{title}</h2>
            <ul className="space-y-2">
                {title.toLowerCase() === 'task' && (
                    <>
                        {tags.map((tag) => (
                            <li key={tag.id} className="flex items-center gap-2">
                                <div 
                                    className="w-4 h-4 rounded-full" 
                                    style={{ backgroundColor: tag.color }}
                                    aria-hidden="true"
                                ></div>
                                <Link 
                                    to={`/`} onClick={(e) => {e.preventDefault()}}
                                    className="groupLink text-lg hover:underline"
                                >
                                    {tag.name}
                                </Link>
                            </li>
                        ))}
                    </>
                )}
                {title.toLowerCase() === 'groupe' && (
                    <>
                        {datas.map((data) => (
                            <li key={data.id}>
                                <button
                                    onClick={() => handleClick(data.id)}
                                    className="groupLink text-lg hover:underline"
                                >
                                    {data.name}
                                </button>
                            </li>
                        ))}
                    </>
                )}
            </ul>
            {title.toLowerCase() === 'groupe' && (
                <ModalGroup 
                    isOpen={isOpen} 
                    setIsOpen={setIsOpen} 
                    bouton={bouton} 
                    title={title} 
                    onGroupAdded={onGroupAdded}
                />
            )}
        </div>
    );
}