import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageStore {
  language: string;
  color: string;
  searchlocked: boolean;
  setLanguage: (language: string) => void;
  setSearchLocked: (searchlocked: boolean) => void;
}

export const usePersistStore = create<LanguageStore>()(
  persist(
    (set) => ({
      searchlocked: false,
      language: "pl",
      color: "blue-500",
      setSearchLocked: (searchlocked: boolean) => set({ searchlocked }),
      setLanguage: (language: string) => set({ language }),
    }),
    {
      name: "language",
    }
  )
);
