import { ArrowLeft, ArrowRight, CalendarClock, CalendarClockIcon } from "lucide-react";
import './taskComponent.scss';

export default function TaskComponent(){
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
                <div className="task-list flex gap-2 items-center p-3 rounded bg-white w-full">
                    <p className="bg-gray-600 p-2 rounded text-white">#TAG</p>
                    <input type="text" className="w-full rounded-md p-2" />
                    <CalendarClockIcon />
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