import { ArrowLeft, ArrowRight, CalendarClock, CalendarClockIcon } from "lucide-react";
import './taskComponent.scss';
import { useState } from "react";
import useTagStore from "../../Store/userTagStore";
import { post } from "../../ApiService";

export default function TaskComponent(){
    // changer le background-color
    const [tagColor, setTagColor] = useState("#84C825")
    const [taskText, setTaskText] = useState("")
    const [dueDate, setDueDate] = useState("")
    const { tags, fetchTags } = useTagStore();  // Utilisez le store

    const idUser = JSON.parse(sessionStorage.getItem('user')).id;
    const groupId = JSON.parse(localStorage.getItem('group')).id;
    console.log("groupId", groupId)

    const handleColorChange = (e) => {
        setTagColor(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Tâche soumise:", { tagColor, taskText, dueDate, idUser, groupId })
        try {
            const sendTask = await post('task/create', {
                tagColor,
                taskText,
                dueDate,
                idUser,
                groupId
            })
            console.log("Tâche envoyée:", sendTask)
        }catch (err) {
            console.error(err)
        }
        setTaskText("")
        setDueDate("")
        setTagColor("#84C825")
    }
    return(
        <>
        <div className="flex flex-col justify-center items-center">
            <div className="text-4xl items-center flex justify-center gap-3">
                <ArrowLeft />
                <h1>TaskComponent</h1>
                <ArrowRight />
            </div>
            {/* Listes des task avec un tag en couleur et une checkbox pour valider le task */}
            <div className="flex flex-col w-full items-center justify-center gap-3 mt-10">
            <form onSubmit={handleSubmit} className="task-form bg-white p-4 rounded-lg shadow-md w-full">
                <div className="task-list flex gap-2 items-center mb-4 justify-center">
                    <div className="flex items-center gap-2">
                    <label className={`p-2 rounded text-white`} style={{backgroundColor: tagColor}}>#TAG</label>
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
                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Ajouter la tâche
                </button>
            </form>
                <div className="task-list w-3/5 flex justify-around items-center p-3 rounded bg-white">
                    <div className="flex items-center gap-4">
                        <div className="rounded w-2 h-2 bg-black"></div>
                        <p>Nom de la task 1</p>
                    </div>
                    <input type="checkbox" className="checkbox" />
                </div>
                <div className="task-list w-3/5 flex justify-around items-center p-3 rounded bg-white">
                    <div className="flex items-center gap-4">
                        <div className="rounded w-2 h-2 bg-black"></div>
                        <p>Nom de la task 1</p>
                    </div>
                    <input type="checkbox" className="checkbox" />
                </div>
                <div className="task-list w-3/5 flex justify-around items-center p-3 rounded bg-white">
                    <div className="flex items-center gap-4">
                        <div className="rounded w-2 h-2 bg-black"></div>
                        <p>Nom de la task 1</p>
                    </div>
                    <input type="checkbox" className="checkbox" />
                </div>
            </div>
        </div>
        </>
    )
}