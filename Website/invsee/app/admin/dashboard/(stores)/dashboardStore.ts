"use client";

import { create } from "zustand";
import { DashboardStore, DashboardActions } from "./types/dashboardTypes";
import { persist } from "zustand/middleware";

export const useDashboardStore = create<DashboardActions & DashboardStore>()(
    persist(
      (set) => ({
        selectedDashboardSection: "",
        setSelectedDashboardSection: (value) => set({ selectedDashboardSection: value }),
        editDashboardStore: (value) => set({ ...value }),
      }),
      { name: "dashboard" }
    )
  );
