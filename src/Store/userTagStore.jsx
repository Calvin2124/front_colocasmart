import { create } from 'zustand'
import { get } from "../ApiService"

const useTagStore = create((set) => ({
    tags: [],
    fetchTags: async () => {
    try {
        const data = await get(`defaultTags/defaultTags`);
        set({ tags: data });
        console.log(data)
        } catch (error) {
        console.error("Erreur lors de la récupération des tags", error);
        }
    },
}))

export default useTagStore;