import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type OldUser = {
    _id: string;
    first_name: string;
    last_name: string;
    nick: string;
    connected_accounts: string[];
    badges: string[];
    role: string;
    image_src: string;
}

interface UserStore {
    account_data: OldUser[];
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