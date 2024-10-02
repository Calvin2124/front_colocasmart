import { useState } from "react";
import { post } from "../../services/ApiService";

export default function AddGroupForm() {
    const [groupName, setGroupName] = useState("");
    const [createGroupPass, setCreateGroupPass] = useState("");
    const [confirmGroupPass, setConfirmGroupPass] = useState("");
    const [error, setError] = useState("");

    // Récupérer l'id dans la session
    const user = sessionStorage.getItem("user");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (createGroupPass !== confirmGroupPass) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }
        const user = sessionStorage.getItem("user");
        console.log(groupName, createGroupPass, confirmGroupPass, JSON.parse(user).id);
        try{
            const data = await post('/group/create', {
                name: groupName,
                password: createGroupPass,
                userId: JSON.parse(user).id,
            });
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white bg-opacity-90 rounded-lg">
    <h2 className="text-2xl font-bold mb-4 text-blue-600">Créer un groupe</h2>
    <div>
        <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Nom du groupe</label>
        <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} id="groupName" name="groupName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
    <div>
        <label htmlFor="createGroupPass" className="block text-sm font-medium text-gray-700">Mot de passe du groupe</label>
        <input type="password" value={createGroupPass} onChange={(e) => setCreateGroupPass(e.target.value)} id="createGroupPass" name="createGroupPass" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
    </div>
    <div>
        <label htmlFor="confirmGroupPass" className="block text-sm font-medium text-gray-700">Mot de passe du groupe</label>
        <input type="password" value={confirmGroupPass} onChange={(e) => setConfirmGroupPass(e.target.value)} id="confirmGroupPass" name="confirmGroupPass" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
    </div>
    <button type="submit" className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Créer le groupe
    </button>
    </form>
    )
}
