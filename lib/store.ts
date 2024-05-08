import { StateCreator, create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchInputState {
  desc: string;
  country: string;
  city: string;
  whereDidFind: string;
  setInput: (a: any) => void;
}

export const useSearchInputState = create<SearchInputState>((set, get) => ({
  desc: '',
  country: '',
  city: '',
  whereDidFind: '',

  setInput: (data: Partial<SearchInputState>) => {
    set(state => ({ ...state, ...data }));
  },
}));

