import { create } from 'zustand';
import { post } from '../ApiService';

const useUserStore = create((set) => ({
    sessionToken: null,
    groups: [],  // Initialisé comme un tableau vide
    error: null,
    loading: false,
    setSessionToken: (token) => set({ sessionToken: token }),
    fetchGroups: async () => {
        const { sessionToken } = useUserStore.getState();
        if (!sessionToken) return;

        set({ loading: true });
        try {
        const data = await post('home/connected', {
            id: sessionToken.id
        }, sessionToken.token);
        set({ groups: data || [], error: null });  // Utilisation de data || [] pour s'assurer qu'on a toujours un tableau
        } catch (error) {
        console.error(error);
        set({ error: 'Une erreur est survenue lors de la récupération des données.', groups: [] });
        } finally {
        set({ loading: false });
        }
    },
}));

export default useUserStore;