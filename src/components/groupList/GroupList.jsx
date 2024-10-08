import { Link, useNavigate } from "react-router-dom";
import './groupList.scss';
import { useState, useEffect } from "react";
import ModalGroup from "../modalGroup/ModalGroup";
import useTagStore from "../../Store/userTagStore";
import useUserStore from "../../Store/userStore";

export default function GroupList({ title, bouton }) {
    const [isOpen, setIsOpen] = useState(false);
    const { tags, fetchTags, loading: tagsLoading, error: tagsError } = useTagStore();
    const { groups, fetchGroups, loading: groupsLoading, error: groupsError } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifiez si les données sont déjà chargées pour éviter des appels inutiles
        if (groups.length === 0) {
            fetchGroups();
        }
        if (tags.length === 0) {
            fetchTags();
        }
    }, []); // Dépendances vides pour que cela ne s'exécute qu'une fois au montage

    const handleClick = (groupId) => {
        //chercher un groups qui correspond a l'od 
        navigate(`/homegroup/${groupId}`);
    };

    if (tagsLoading || groupsLoading) {
        return <div>Chargement...</div>;
    }

    if (tagsError || groupsError) {
        return <div>Une erreur est survenue lors du chargement des données.</div>;
    }

    const isGroupList = title.toLowerCase() === 'groupe';

    return (
        <div className="groupAside">
            <h2 className="text-4xl mb-5">{title}</h2>
            <ul className="space-y-2">
                {!isGroupList ? (
                    (tags || []).map((tag) => (
                        <li key={tag.id} className="flex items-center gap-2">
                            <div 
                                className="w-4 h-4 rounded-full" 
                                style={{ backgroundColor: tag.color }}
                                aria-hidden="true"
                            ></div>
                            <Link 
                                to="/" 
                                onClick={(e) => e.preventDefault()}
                                className="groupLink text-lg hover:underline"
                            >
                                {tag.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    (groups || []).map((group) => (
                        <li key={group.id}>
                            <button
                                onClick={() => handleClick(group.id)}
                                className="groupLink text-lg hover:underline"
                            >
                                {group.name}
                            </button>
                        </li>
                    ))
                )}
            </ul>
            {isGroupList && (
                <ModalGroup 
                    isOpen={isOpen} 
                    setIsOpen={setIsOpen} 
                    bouton={bouton} 
                    title={title}
                />
            )}
        </div>
    );
}