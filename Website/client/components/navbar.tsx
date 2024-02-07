"use client";

import { Button } from "./ui/button";
import React, { useEffect, useState } from "react";
import "./ui.css";
import { Key } from "lucide-react";
import { connectMongo } from "@/app/api/mongo/mongo";
import { ObjectId } from "mongodb";
import { getUserData } from "@/mongo_actions/addSomething";
import axios from "axios";
import { SessionProvider, signOut, useSession } from "next-auth/react";



export default function Navbar() {


  const [isLogged, setisLogged] = useState<boolean | any>()
  const [data, setdata] = useState<any>([])

  const getUser = async (id: string) => {
    const response = await axios.post('http://localhost:3000/api/login/check_admin', {id: id});

    setdata(response.data)
    console.log(response.data)
  }
  

  useEffect(() => {

    setisLogged(true)
    const id: any = localStorage.getItem('id');
    getUser(id);

    

  }, [])

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
            const res = signOut()
            console.log(res)
            setTimeout(() => {
              window.location.href = '/login'
            }, 1000)
            
          }}
          
        >
          Logout
        </Button>}
      </div>
    </nav>
  );
}
