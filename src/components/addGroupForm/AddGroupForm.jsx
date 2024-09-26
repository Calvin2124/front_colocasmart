export default function AddGroupForm() {
    return (
        <form className="space-y-4 p-6 bg-white bg-opacity-90 rounded-lg">
    <h2 className="text-2xl font-bold mb-4 text-blue-600">Ajouter un groupe</h2>
    <div>
        <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Nom du groupe</label>
        <input type="text" id="groupName" name="groupName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
    </div>
    <div>
        <label htmlFor="createGroupPass" className="block text-sm font-medium text-gray-700">Mot de passe du groupe</label>
        <input type="password" id="createGroupPass" name="createGroupPass" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
    </div>
    <div>
        <label htmlFor="confirmGroupPass" className="block text-sm font-medium text-gray-700">Mot de passe du groupe</label>
        <input type="password" id="confirmGroupPass" name="confirmGroupPass" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
    </div>
    <button type="submit" className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Créer le groupe
    </button>
    </form>
    )
}