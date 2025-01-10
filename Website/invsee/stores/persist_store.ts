import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PersistStoreArgs = {
  language: string;
  color: string;
  searchLocked: boolean;
  token: string
}

type PersistStoreActions = {
  setLanguage: (language: string) => void;
  setSearchLocked: (searchlocked: boolean) => void;
  setToken: (token: string) => void;
}

export const usePersistStore = create<PersistStoreArgs & PersistStoreActions>()(
  persist(
    (set) => ({
        token: "",
        searchLocked: false,
        language: "pl",
        color: "blue-500",
        setSearchLocked: (searchLocked: boolean) => set({ searchLocked }),
        setLanguage: (language: string) => set({ language }),
        setToken: (token: string) => set({ token }),
    }),
    {
      name: "language",
    }
  )
);
