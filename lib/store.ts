import { create } from 'zustand';

interface OpenPostDetails {
  idPost: null | string;
  setIdPost: (data: null | string) => void;
}

export const useOpenPostDetails = create<OpenPostDetails>(set => ({
  idPost:
    typeof window !== 'undefined'
      ? localStorage.getItem('idPost') || null
      : null,
  setIdPost: (search: null | string) => {
    set({ idPost: search });
    if (typeof window !== 'undefined') {
      localStorage.setItem('idPost', search || '');
    }
  },
}));
