'use client'

import { Button } from "./ui/button";
import "./ui.css";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/dist/server/api-utils";

export default function Navbar() {
  const { data: token, status } = useSession()

  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      setIsLogged(true)
      console.log()
    } else {
      setIsLogged(false)
    }
  }, [token])

  const handleLogout = () => {
    signOut()
    setIsLogged(false)
  }

  return (
    <nav className="flex items-center justify-between px-5 py-5">
      <div className="flex items-center">
        <h1 className="text-white text-[25px] font-[600]">LookAtYourServer</h1>
      </div>
      
      <div className="flex gap-2">
        {isLogged != true ? <Button
          id="nav_button"
          className="bg-gradient-to-r from-blue-500 to-purple-500 px-7 hover:from-purple-500 hover:to-blue-500"
          onClick={() => {
            window.location.href = '/login';
          }}
          
        >
          Login
        </Button>: <Button
          id="nav_button"
          className="bg-gradient-to-r from-blue-500 to-purple-500 px-7 hover:from-purple-500 hover:to-blue-500"
          onClick={() => {
            handleLogout()
            
            
          }}
          
        >
          Logout
        </Button>}
      </div>
    </nav>
  );
}
