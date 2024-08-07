import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PersistStoreArgs = {
  language: string;
  color: string;
  searchlocked: boolean; 
}

type PersistStoreActions = {
  setLanguage: (language: string) => void;
  setSearchLocked: (searchlocked: boolean) => void;
}

export const usePersistStore = create<PersistStoreArgs & PersistStoreActions>()(
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
