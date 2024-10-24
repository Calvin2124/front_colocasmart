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
    const [currentDate, setCurrentDate] = useState(new Date());
    const [todayDate, setTodayDate] = useState(new Date());

    // Fonction pour formater une date en chaîne lisible (sans conversion incorrecte)
    const formatDate = (date) => {
        return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        });
    };

    // Fonction pour récupérer le jour précédent
    const getPreviousDay = () => {
        const previousDay = new Date(currentDate);
        previousDay.setDate(previousDay.getDate() - 1);
        setCurrentDate(previousDay);
    };

    // Fonction pour récupérer le jour suivant
    const getNextDay = () => {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
        setCurrentDate(nextDay);
    };

    useEffect(() => {
        setTodayDate(new Date()); // Définit la date d'aujourd'hui lors du montage du composant
    }, []);

    const sessionUser = sessionStorage.getItem('user');
    const localUser = localStorage.getItem('user');
    if (!sessionUser && !localUser) {
        throw new Error('User not found in sessionStorage or localStorage');
    }

    const idUser = sessionUser ? JSON.parse(sessionUser).id : JSON.parse(localUser).id;
    const groupId = JSON.parse(localStorage.getItem('group')).id;

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
        selectedDate.setHours(0, 0, 0, 0);
    
        if (selectedDate < today) {
            setErrorMessage("La date d'échéance ne peut pas être antérieure à la date actuelle.");
            return;
        }
    
        try {
            const newTask = await post('task/create', {
                tagColor,
                taskText,
                dueDate,   // Vérifiez que vous passez la bonne date
                idUser,
                groupId
            });
            console.log("New task created:", newTask);
            
            setTaskText("");
            setDueDate("");
            setTagColor("#84C825");
        } catch (err) {
            console.error("Error creating task:", err);
            setErrorMessage("Une erreur est survenue lors de la création de la tâche.");
        }
    }

    const fetchTasks = useCallback(async () => {
        try {
            const formattedDate = currentDate.toISOString().split('T')[0]; // format YYYY-MM-DD
            const dataTask = await post("task/list", {
                idUser,
                groupId,
                date: formattedDate  // Assurez-vous d'envoyer la date actuelle sélectionnée
            });
            // console.log("Fetched tasks for date:", formattedDate, dataTask);
            setTasks(dataTask);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    }, [idUser, groupId, currentDate]);

    useEffect(() => {
        const newSocket = io('http://localhost:3000', {
            query: { groupId, idUser }
        });
        setSocket(newSocket);
    
        newSocket.on('connect', () => {
            // console.log('Connected to Socket.IO server');
            newSocket.emit('joinGroup', groupId);
        });
    
        // Écouter l'événement 'newTask'
        newSocket.on('newTask', (task) => {
            console.log("New task received:", task);
            setTasks(prevTasks => {
                const taskExists = prevTasks.some(t => t.id === task.id);
                if (!taskExists) {
                    return [...prevTasks, task];
                }
                return prevTasks;
            });
        });
    
        // Ajouter l'écoute des mises à jour de tâches
        newSocket.on('taskUpdated', ({ taskId, completed }) => {
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId
                        ? { ...task, completed }
                        : task
                )
            );
        });
    
        fetchTasks();
    
        return () => {
            newSocket.off('newTask');
            newSocket.off('taskUpdated');
            newSocket.close();
        };
    }, [groupId, fetchTasks, idUser]);

    const handleTaskStatusChange = async (taskId, completed) => {
        try {
            await post("task/updateStatus", {
                taskId,
                completed,
                groupId
            });
        } catch (err) {
            console.error("Error updating task status:", err);
        }
    };

    const handleColorChange = (e) => {
        setTagColor(e.target.value);
    }


    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="text-4xl items-center flex justify-center gap-3">
                    <ArrowLeft onClick={getPreviousDay}/>
                    <h1>{formatDate(currentDate)}</h1>
                    <ArrowRight onClick={getNextDay}/>
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
                                    <input 
                                        type="checkbox" 
                                        className="checkbox" 
                                        checked={task.completed}
                                        onChange={() => handleTaskStatusChange(task.id, !task.completed)}
                                    />
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