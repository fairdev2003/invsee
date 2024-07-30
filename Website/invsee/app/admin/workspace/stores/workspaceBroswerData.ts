'use client'

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Mod } from "@prisma/client";
import type {
  WorkspaceActions,
  Workspaces,
  Workspace,
} from "../../../../stores/types/workspaceTypes";
import ItemWorkspace from "../(components)/(workspaces)/ItemWorkspace/ItemWorkspace1";

export const useWorkspaceStore = create<WorkspaceActions & Workspaces>()(
  persist((set) => ({
    itemWorkspace: {
      workspaceErorr: {
        error: false,
        description: "",
        message: "",
      },
      stackSize: "0",
      workspaceName: "My First Workspace",
      itemName: "",
      itemTag: "",
      itemImage: "",
      gallery: [],
      itemDescription: "",
      materialValue: "0",
      wikiElements: [],
      modTag: "",
      itemType: "",
      mod: {} as Mod,
      itemTags: [],
      step: 1,
    },
    setErrorExplaination : async (message: string, description: string) => {
      set((state) => ({
        itemWorkspace: {
          ...state.itemWorkspace,
          workspaceErorr: {
            ...state.itemWorkspace.workspaceErorr,
            message,
            description,
          },
        },
      }));
    },
    setErrorState: async (data: boolean) => {
      set((state) => ({
        itemWorkspace: {
          ...state.itemWorkspace,
          workspaceErorr: {
            ...state.itemWorkspace.workspaceErorr,
            error: data,
          },
        },
      }));
    },
    page: "mainpage",
    setItemWorkspaceState: async (key: string, value: any) => {
      set((state) => ({
        itemWorkspace: {
          ...state.itemWorkspace,
          [key]: value,
        },
      }));
    },
    setpage: async (data: any) => set({ page: data }),
    addNewWikiElement: async (wikiElement: any) => {
      set((state) => ({
        itemWorkspace: {
          ...state.itemWorkspace,
          wikiElements: [...state.itemWorkspace.wikiElements, wikiElement],
        },
      }));
    },
   deleteWikiElement: async (index: number) => {
      set((state: WorkspaceActions & Workspaces) => {

        console.log(index);
        
        const newWikiTable: any = [];
        state.itemWorkspace.wikiElements.forEach((element: any, i: number) => {
          if (element.id !== index) {
            newWikiTable.push(element);
          }
        })

        return {
          itemWorkspace: {
            ...state.itemWorkspace,
            wikiElements: newWikiTable,
          },
        };
      });
   },
   
   editWikiElement: async (index: number, wikiElement: any) => {
      // @ts-ignore
      set((state) => {
        const newWikiTable: any = [];
        state.itemWorkspace.wikiElements.forEach((element: any, i: number) => {
          if (element.id === index) {
            newWikiTable.push(wikiElement);
          } else {
            newWikiTable.push(element);
          }
        });

        return {
          itemWorksapce: {
            ...state.itemWorkspace,
            wikiElements: newWikiTable,
          },
        };
      });
   }

    
  }), { name: "workspaces" })
);
