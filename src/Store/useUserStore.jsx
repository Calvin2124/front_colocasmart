import { create } from 'zustand'; // Importation nommée de `create`

export const useUserStore = create((set) => ({
  user: null, // Informations utilisateur
  rememberMe: false, // Flag pour savoir si "Se souvenir de moi" est activé

  // Fonction pour définir l'utilisateur et stocker dans localStorage ou sessionStorage selon "rememberMe"
    setUser: (user, rememberMe) => {
    set({ user, rememberMe });

    const storage = rememberMe ? localStorage : sessionStorage; // Choisir le storage en fonction de "rememberMe"
    storage.setItem('user', JSON.stringify(user));
    },

  // Fonction pour charger l'utilisateur depuis localStorage ou sessionStorage
    loadUser: () => {
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        const isRemembered = !!localStorage.getItem('user'); // Vérifier si c'était via localStorage
        set({ user: userData, rememberMe: isRemembered });
        }
    },

  // Déconnexion et nettoyage des données
    clearUser: () => {
        set({ user: null, rememberMe: false });
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
    },
}));