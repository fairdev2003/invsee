import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface UserStore {
    account_data: any[];
    users: any[];
    loading: boolean;
}

interface UserActions {
    setAccountData: ( data: any ) => void;
    setUsers: ( data: any ) => void;
    updateUsers: ( data: any ) => void;
}

export const useUserStore = create<UserStore & UserActions>((set) => ({
    account_data: [],
    loading: false,
    users: [],
    setAccountData: async (data : any) => {set({account_data: data})},
    setUsers: async (data : any) => {set({users: data})},
    updateUsers: async (data) => {set({users: data})}
}))