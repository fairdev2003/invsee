import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select"
import axios from "axios"
import Image from "next/image"
import { Suspense, useEffect, useState } from "react"
import { useUserStore } from "@/stores/user_store"
import { Lock, RefreshCcw } from "lucide-react"
import { set } from "mongoose"


const roles_with_access = ["Admin", "Mod", "Editor", "Owner"]


export const UsersWithAccess = () => {

    const { account_data, setUsers, users }: any = useUserStore()
    const [ state, setState ] = useState<string>('')

    const fetch_users = async () => {
        
            const response = await axios.get('api/user')

            setUsers(response.data)
            

            console.log(users)

    }

    const handleRefresh = () => {
        setUsers([])

        fetch_users()
    }

    useEffect(() => {
        if (roles_with_access.includes(account_data[0].role) === false){
            return;
        } else {
            fetch_users()
        }

        
    }, [])


    const handleRoleChange = async (value: string, email: string) => {

        
        const response = await axios.patch(`api/user?search_by=email&value=${email}&update=role`, {data: value});
        console.log(response.data);
        setUsers([]);
        fetch_users();
        setState("Changed role to: " + value + " for user with email: " + email);

        setTimeout(() => {
            setState('')
        }, 6000);
        
    }

    return (
        <Card>
            {account_data.length > 0 && roles_with_access.includes(account_data[0].role) ? <CardContent className="border-[2px] border-gray-900/50 rounded-md text-white p-5 w-[500px] mt-5">
                <div className="flex justify-between">
                    <CardTitle>User with access</CardTitle>
                    <RefreshCcw className={`w-5 h-5 cursor-pointer  transition-colors hover:text-blue-500 ${users.length === 0 ? "animate-spin duration-1000 text-blue-500" : "text-white"}`} onClick={() => {handleRefresh()}}/>
                </div>
                
                <CardDescription className="mt-1">Users with access to the dashboard</CardDescription>
                <div className="flex flex-col gap-y-4 mt-4">
                    {users.length > 0 ? users.slice(0, 3).map((user: any, index: number) => {
                        return (
                            <div className="flex items-center bg-gray-900/50 p-3 rounded-lg relative" key={index + 1}>
                                <Image alt='profile image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT77tI2-d92MthNA0HLYbVqYueO9r6P3u7zEDTYoOjLLmJVetvXJp_j1eU0v4uYUd02Jk" width={100} height={100} className='rounded-lg w-[45px] h-[45px]'></Image>
                                <div className="flex flex-col w-[300px] ml-5">
                                    <p className="text-[15px] font-medium">{user.nick} <span  className="text-blue-500">{account_data[0].nick === user.nick ? "You" : null}</span></p>
                                    <p className="text-[13px] opacity-50">{user.email}</p>
                                </div>
                                {account_data[0].nick !== user.nick && account_data[0].role !== user.role ?<Select onValueChange={(value) => {handleRoleChange(value, user.email)}}>
                                <SelectTrigger className="w-[180px] border-none" disabled={account_data[0].role !== "Admin"}>
                                    <Button variant='secondary' className="w-[100px]">{user.role}</Button>
                                </SelectTrigger>
                                <SelectContent className="bg-gray-900 text-white border-none">
                                    <SelectGroup>
                                        <SelectLabel>Roles</SelectLabel>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Mod">Mod</SelectItem>
                                        <SelectItem value="Editor">Editor</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                                </Select> : null}
                                
                            </div>
                        )
                    }) : null}
                    
                </div>
                {users.length > 0 ? <CardDescription className=" mt-3">and {users.length - 3} more...</CardDescription> : null}
                {state.length > 0 ? <CardDescription className=" mt-3 text-emerald-500">{state}</CardDescription> : null}
                
            </CardContent> : <CardContent className="border-[2px] border-gray-900/50 rounded-md text-white p-5 w-[500px] mt-5 flex flex-col gap-1 justify-center items-center">
                    <div className="flex gap-2 items-center">
                        <Lock className="text-red-500"/>
                        <h2 className="text-red-500">No permission</h2>
                    </div>
                    <h3 className="text-gray-500 mt-1 text-sm text-center">This content might be blocked because your role is too low. <br/>Try to log into account with <b>Admin</b> or above to access this section!</h3>
            </CardContent>}
        </Card>
    )
}