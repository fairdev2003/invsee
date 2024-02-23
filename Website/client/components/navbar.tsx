"use client";

import { Button } from "./ui/button";
import "./ui.css";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Separator } from "@radix-ui/react-separator";
import { Crown, Hammer, Star, StarOffIcon } from "lucide-react";
import { useUserStore } from "@/stores/user_store";
import axios from "axios";
import { redirect } from "next/navigation";

export default function Navbar() {
  const { data: token, status } = useSession();

  const { account_data, setAccountData } = useUserStore()

  const [isLogged, setIsLogged] = useState<boolean>(false);

  const fetch_user = async () => {
    try {
      const response = await axios.get(`/api/user?search_by=email&name=${token?.user?.email}`);
      const data = response.data;
      setAccountData(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  
  }

  useEffect(() => {
    if (token?.user?.email) {
      setIsLogged(true);
      console.log(account_data);

      fetch_user();

    } else {
      setIsLogged(false);
    }
  }, [token?.user?.email]);

  const handleLogout = async () => {
    await signOut();
    setAccountData([]);
    setIsLogged(false);
    window.location.href = "/login";
  };

  return (
    <nav className="flex items-center justify-between px-5 py-5 text-white border-b-gray-800 border-b-[1px] mx-7 h-[75px] mb-5">
      {!isLogged ? (
        <div className="flex items-center">
          <h1 className="text-white text-[25px] font-[600]">
            <Link href="/">Minecraft Wiki</Link>
          </h1>
          <div className="flex gap-5 ml-5">
            <Link
              href="/wiki"
              className="text-white hover:text-blue-500 transition-colors"
            >
              Wiki
            </Link>
            <Link
              href="/dashboard"
              className="text-white hover:text-blue-500 transition-colors"
            >
              Dashboard
            </Link>

            
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-x-3">
          <h1 className="text-white text-[25px] font-[600]">
            <Link href="/dashboard">Dashboard</Link>

            
          </h1>

          <Link href="/dashboard?section=overview" className="text-[15px] hover:text-blue-500">Overview</Link>
          <Link href="/dashboard?section=workspace" className="text-[15px] hover:text-blue-500">Workspace</Link>
          <Link href="/dashboard?section=allies" className="text-[15px] hover:text-blue-500">Users & Roles</Link>
        </div>
      )}

      <div>
      {account_data && account_data.length > 0 ? <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT77tI2-d92MthNA0HLYbVqYueO9r6P3u7zEDTYoOjLLmJVetvXJp_j1eU0v4uYUd02Jk" alt="@shadcn" />
            <AvatarFallback className="bg-gray-800 text-white">{account_data.length > 0 ? account_data[0].first_name.slice(0,1) : null}{account_data.length > 0 ? account_data[0].last_name.slice(0,1) : null}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="bg-black text-white w-[180px] border-[1px] border-gray-800 p-1">
          <p className="mx-2 my-1 text-[15px] flex gap-x-2 items-center font-medium">
            {account_data.length > 0 && account_data[0].role === "Editor" ? <Hammer size={15} className='text-orange-400'/> : null}
            {account_data.length > 0 && account_data[0].role === "Mod" ?<Star size={15} className='text-orange-400'/> : null}
            {account_data.length > 0 && account_data[0].role === "Admin" ?<Crown size={15} className='text-orange-400'/> : null}
            {account_data.length > 0 ? account_data[0].nick : "loading..."}
          </p>
          <p className="mx-2 my-1 text-[12px] truncate text-gray-500">{account_data.length > 0 ? account_data[0].email : "loading..."}</p>
          <Separator orientation="horizontal" className="w-full h-[1px] bg-gray-800"></Separator>
          <Button onClick={() => {redirect('/dashboard?section=account-settings')}} variant='outline' className="w-full bg-none h-[35px] mt-1 flex justify-start">Settings</Button>
          <Button onClick={handleLogout} variant='outline' className="w-full bg-none h-[35px] flex justify-start">Billing</Button>
          <Button onClick={handleLogout} variant='outline' className="w-full bg-none h-[35px] hover:bg-red-500 flex justify-start">Logout</Button>
        </PopoverContent>
      </Popover> : null}
        
      </div>
    </nav>
  );
}
