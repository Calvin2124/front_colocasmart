import { ArrowLeft, ArrowRight } from "lucide-react";
import './taskComponent.scss';
import { useEffect, useState, useCallback } from "react";
import useTagStore from "../../Store/userTagStore";
import { post } from "../../ApiService";
import io from 'socket.io-client';

export default function TaskComponent() {
    const [tagColor, setTagColor] = useState("#84C825");
    const [taskText, setTaskText] = useState("");
    const [dueDate, setDueDate] = useState("");
    const { tags } = useTagStore();
    const [tasks, setTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [socket, setSocket] = useState(null);

    const idUser = JSON.parse(sessionStorage.getItem('user')).id;
    const groupId = JSON.parse(localStorage.getItem('group')).id;

    const fetchTasks = useCallback(async () => {
        try {
            const dataTask = await post("task/list", {
                idUser,
                groupId
            });
            console.log("Fetched tasks:", dataTask);
            setTasks(dataTask);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    }, [idUser, groupId]);

    useEffect(() => {
        const newSocket = io('http://localhost:3000', {
            query: { groupId, idUser }
        });
        setSocket(newSocket);
    
        newSocket.on('connect', () => {
            console.log('Connected to Socket.IO server');
            newSocket.emit('joinGroup', groupId);
        });
    
        // Écouter l'événement 'newTask'
        newSocket.on('newTask', (task) => {
            console.log("New task received:", task);
            setTasks(prevTasks => {
                const taskExists = prevTasks.some(t => t.id === task.id);
                if (!taskExists) {
                    return [...prevTasks, task]; // Ajoute la nouvelle tâche
                }
                return prevTasks;
            });
        });
    
        // Récupération des tâches initiales
        fetchTasks();
    
        return () => {
            newSocket.off('newTask');
            newSocket.close();
        };
    }, [groupId, fetchTasks, idUser]);

    const handleColorChange = (e) => {
        setTagColor(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!taskText.trim()) {
            setErrorMessage("Le texte de la tâche ne peut pas être vide.");
            return;
        }

        const taskTextRegex = /^[a-zA-Z0-9À-ÿ\s.,;!?'-]*$/;
        if (!taskTextRegex.test(taskText)) {
            setErrorMessage("Le texte de la tâche contient des caractères non autorisés.");
            return;
        }

        if (!dueDate) {
            setErrorMessage("Veuillez sélectionner une date d'échéance.");
            return;
        }

        const selectedDate = new Date(dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

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
            console.log("New task created:", newTask);
            
            // Ne pas mettre à jour l'état local ici, la mise à jour se fera via Socket.IO
            
            setTaskText("");
            setDueDate("");
            setTagColor("#84C825");
        } catch (err) {
            console.error("Error creating task:", err);
            setErrorMessage("Une erreur est survenue lors de la création de la tâche.");
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="text-4xl items-center flex justify-center gap-3">
                    <ArrowLeft />
                    <h1>TaskComponent</h1>
                    <ArrowRight />
                </div>
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
                                    min={new Date().toISOString().split("T")[0]}
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
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
                                    <input type="checkbox" className="checkbox" />
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