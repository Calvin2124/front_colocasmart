import { ArrowLeft, ArrowRight, CalendarClock, CalendarClockIcon } from "lucide-react";
import './taskComponent.scss';
import { useEffect, useState } from "react";
import useTagStore from "../../Store/userTagStore";
import { post } from "../../ApiService";

export default function TaskComponent() {
    const [tagColor, setTagColor] = useState("#84C825");
    const [taskText, setTaskText] = useState("");
    const [dueDate, setDueDate] = useState("");
    const { tags } = useTagStore();
    const [tasks, setTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState(""); // État pour les messages d'erreur

    const idUser = JSON.parse(sessionStorage.getItem('user')).id;
    const groupId = JSON.parse(localStorage.getItem('group')).id;

    const handleColorChange = (e) => {
        setTagColor(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Réinitialiser le message d'erreur

        // Validation des entrées
        if (!taskText.trim()) {
            setErrorMessage("Le texte de la tâche ne peut pas être vide.");
            return;
        }

        // Expression régulière pour valider le texte de la tâche
        const taskTextRegex = /^[a-zA-Z0-9À-ÿ\s.,;!?'-]*$/; // Permet uniquement des lettres, chiffres et quelques ponctuations

        if (!taskTextRegex.test(taskText)) {
            setErrorMessage("Le texte de la tâche contient des caractères non autorisés.");
            return;
        }

        if (!dueDate) {
            setErrorMessage("Veuillez sélectionner une date d'échéance.");
            return;
        }

        // Vérifier que la date n'est pas antérieure à la date actuelle
        const selectedDate = new Date(dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Réinitialiser les heures pour comparer uniquement les dates

        if (selectedDate < today) {
            setErrorMessage("La date d'échéance ne peut pas être antérieure à la date actuelle.");
            return;
        }

        try {
            const newTask = await post('task/create', {
                tagColor,
                taskText,
                dueDate,
                idUser,
                groupId
            });
            console.log(newTask);
            setTasks(prevTasks => [...prevTasks, newTask]); // Ajouter la nouvelle tâche à la liste des tâches
            // Réinitialiser les champs après l'envoi
            setTaskText("");
            setDueDate("");
            setTagColor("#84C825");
        } catch (err) {
            console.error(err);
            setErrorMessage("Une erreur est survenue lors de la création de la tâche."); // Gestion des erreurs d'API
        }
    }

    // Récupérer les tâches du groupe
    const fetchTasks = async () => {
        try {
            const dataTask = await post("task/list", {
                idUser,
                groupId
            });
            console.log(dataTask);
            setTasks(dataTask);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, [idUser, groupId]);

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="text-4xl items-center flex justify-center gap-3">
                    <ArrowLeft />
                    <h1>TaskComponent</h1>
                    <ArrowRight />
                </div>
                {/* Formulaire pour ajouter une tâche */}
                <div className="flex flex-col w-full items-center justify-center gap-3 mt-10">
                    <form onSubmit={handleSubmit} className="task-form bg-white p-4 rounded-lg shadow-md w-full">
                        <div className="task-list flex gap-2 items-center mb-4 justify-center">
                            <div className="flex items-center gap-2">
                                <label className={`p-2 rounded text-white`} style={{ backgroundColor: tagColor }}>#TAG</label>
                                <select 
                                    onChange={handleColorChange} 
                                    value={tagColor}
                                    className="border border-gray-300 rounded-md p-2 text-base"
                                >
                                    {tags.map((tag) => (
                                        <option key={tag.name} value={tag.color}>
                                            {tag.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="date"
                                    className="rounded-md p-2 border border-gray-300"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    min={new Date().toISOString().split("T")[0]} // Date minimale: aujourd'hui
                                />
                            </div>
                        </div>
                        <input 
                            type="text" 
                            className="flex-grow min-w-0 rounded-md p-2 border border-gray-300" 
                            placeholder="Tâche"
                            value={taskText}
                            onChange={(e) => setTaskText(e.target.value)}
                            required
                        />
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Affichage du message d'erreur */}
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Ajouter la tâche
                        </button>
                    </form>
                    <div className="w-full flex flex-col gap-2 items-center max-h-96 overflow-auto">
                    {
                        tasks.length === 0 ? (
                            <p className="text-2xl w-3/5 flex justify-center">Vous n'avez pas de tâches</p>
                        ) : (
                            tasks.map((task, index) => (
                                <div key={index} className="task-list w-3/5 flex justify-around items-center p-3 rounded bg-white">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-full w-4 h-4" style={{ backgroundColor: task.tagColor }}></div>
                                        <p>{task.taskText}</p>
                                    </div>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </div>
                            ))
                        )
                    }
                    </div>
                </div>
            </div>
        </>
    )
}