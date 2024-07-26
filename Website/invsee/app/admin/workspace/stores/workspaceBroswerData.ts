'use client'

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  WorkspaceActions,
  Workspaces,
  Workspace,
} from "../../../../stores/types/workspaceTypes";
import ItemWorkspace from "../(components)/(workspaces)/ItemWorkspace/ItemWorkspace1";

export const useWorkspaceStore = create<WorkspaceActions & Workspaces>()(
  persist((set) => ({
    itemWorksapce: {
      workspaceErorr: {
        error: false,
        description: "",
        message: "",
      },
      workspaceName: "My First Workspace",
      itemName: "",
      itemTag: "",
      itemImage: "",
      gallery: [],
      itemDescription: "",
      materialValue: 0,
      wikiElements: [],
      modTag: "",
      step: 1,
    },
    setErrorExplaination : async (message: string, description: string) => {
      set((state) => ({
        itemWorksapce: {
          ...state.itemWorksapce,
          workspaceErorr: {
            ...state.itemWorksapce.workspaceErorr,
            message,
            description,
          },
        },
      }));
    },
    setErrorState: async (data: boolean) => {
      set((state) => ({
        itemWorksapce: {
          ...state.itemWorksapce,
          workspaceErorr: {
            ...state.itemWorksapce.workspaceErorr,
            error: data,
          },
        },
      }));
    },
    page: "mainpage",
    setItemWorkspaceState: async (key: string, value: any) => {
      set((state) => ({
        itemWorksapce: {
          ...state.itemWorksapce,
          [key]: value,
        },
      }));
    },
    setpage: async (data: any) => set({ page: data }),
    
  }), { name: "workspaces" })
);
