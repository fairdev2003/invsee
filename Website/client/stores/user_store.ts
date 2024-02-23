import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface UserStore {
    account_data: any[];
    loading: boolean;
    setAccountData: ( data: any) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    account_data: [],
    loading: false,
    setAccountData: async (data : any) => {set({account_data: data})}
}))