import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useUserStore } from "@/stores/user_store"
import { Lock, RefreshCcw } from "lucide-react"


export const UsersWithAccess = () => {

    const { account_data, setUsers, users }: any = useUserStore()



    const fetch_users = async () => {
        
        setTimeout(async () => {
            const response = await axios.get('api/user')

            setUsers(response.data)
            

            console.log(users)

        }, 5000)
    }

    const handleRefresh = () => {
        setUsers([])

        fetch_users()
    }

    useEffect(() => {
        if (account_data[0].role !== "Admin") {

            return;
        } else {
            fetch_users()

            
        }

        
    }, [])

    return (
        <Card>
            {account_data.length > 0 && account_data[0].role === "Admin" ? <CardContent className="border-[2px] border-gray-900/50 rounded-md text-white p-5 w-[500px] mt-5">
                <div className="flex justify-between">
                    <CardTitle>User with access</CardTitle>
                    
                    <RefreshCcw className={`w-5 h-5 cursor-pointer  transition-colors hover:text-blue-500 ${users.length === 0 ? "animate-spin duration-1000 text-blue-500" : "text-white"}`} onClick={() => {handleRefresh()}}/>
                </div>
                
                <CardDescription className="mt-1">Users with access to the dashboard</CardDescription>
                <div className="flex flex-col gap-y-2 mt-4">
                    {users.length > 0 ? users.slice(0, 3).map((user: any, index: number) => {
                        return (
                            <div className="flex items-center bg-gray-900/50 p-3 rounded-lg relative">
                                <Image alt='profile image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT77tI2-d92MthNA0HLYbVqYueO9r6P3u7zEDTYoOjLLmJVetvXJp_j1eU0v4uYUd02Jk" width={100} height={100} className='rounded-lg w-[45px] h-[45px]'></Image>
                                <div className="flex flex-col w-[300px] ml-5">
                                    <p className="text-[15px] font-medium">{user.nick} <span  className="text-blue-500">{account_data[0].nick === user.nick ? "You" : null}</span></p>
                                    <p className="text-[13px] opacity-50">{user.email}</p>
                                </div>
                                <Select>
                                <SelectTrigger className="w-[180px] border-none">
                                    <Button variant='secondary' className="w-[100px]">{user.role}</Button>
                                </SelectTrigger>
                                <SelectContent className="bg-gray-900 text-white border-none">
                                    <SelectGroup>
                                        <SelectLabel>Roles</SelectLabel>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="mod">Mod</SelectItem>
                                        <SelectItem value="editor">Editor</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                                </Select>
                                
                            </div>
                        )
                    }) : null}
                    
                </div>
                {users.length > 0 ? <CardDescription className=" mt-3">and {users.length - 3} more...</CardDescription> : null}
                
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