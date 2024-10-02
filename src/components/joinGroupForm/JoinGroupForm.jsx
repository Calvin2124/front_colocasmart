import { useState } from "react";
import { post } from "../../services/ApiService";

export default function JoinGroupForm() {
    const [groupName, setGroupName] = useState("");
    const [groupPass, setGroupPass] = useState("");
    const [error, setError] = useState("");
    console.log('console log')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = sessionStorage.getItem("user");
        console.log(groupName, groupPass, JSON.parse(user).id);
        try {
            const data = await post('/group/join', {
                userId: JSON.parse(user).id,
                groupName: groupName,
                password: groupPass,
            });
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white bg-opacity-90 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Rejoindre un groupe</h2>
            <div>
                <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Nom du groupe</label>
                <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} id="groupName" name="groupName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
            </div>
            <div>
                <label htmlFor="groupPass" className="block text-sm font-medium text-gray-700">Mot de passe du groupe</label>
                <input type="password" value={groupPass} onChange={(e) => setGroupPass(e.target.value)} id="groupPass" name="groupPass" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                Rejoindre le groupe
            </button>
        </form>
    );
}
