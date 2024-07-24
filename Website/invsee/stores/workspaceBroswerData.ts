'use client'

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  WorkspaceActions,
  Workspaces,
  Workspace,
} from "./types/workspaceTypes";

export const useWorkspaceStore = create<WorkspaceActions & Workspaces>()(
  persist((set) => ({
    workspace: {} as any,
    workspaces: [],
    workspaceIsSelected: false,
    setWorkspace: async (data: any) => set({ workspaces: data }),
    setWorkspaces: async (data: any) => set({ workspaces: data }),
    addWorkspace: async (data: any) => set({ workspaces: [...data] }),
  }), { name: "workspaces" })
);
