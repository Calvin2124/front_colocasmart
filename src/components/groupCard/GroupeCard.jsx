import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import './groupCard.scss';
export default function GroupCard() {
    return (
        <>
            <article className="articleGroup flex flex-col gap-5 p-5">
                <div className="numberUser flex justify-end items-center">
                    <p>+4</p>
                    <Users />
                </div>
                <h2 className="text-2xl text-center">name</h2>
                <hr />
                <Link className="btnEnter" href="#">Entrer</Link>
            </article>
        </>
    )
}