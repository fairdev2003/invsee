import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageStore {
  language: string;
  color: string;
  setLanguage: (language: string) => void;
}

export const usePersistStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "pl",
      color: "blue-500",
      setLanguage: (language: string) => set({ language }),
    }),
    {
      name: "language",
    }
  )
);
