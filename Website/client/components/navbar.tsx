"use client";

import { Button } from "./ui/button";
import React from "react";
import "./ui.css";
import { Key } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 py-5">
      <div className="flex items-center">
        <h1 className="text-white text-[25px] font-[600]">LookAtYourServer</h1>
      </div>
      
      <div className="flex gap-2">
        <Button
          id="nav_button"
          className="bg-gradient-to-r from-blue-500 to-purple-500 px-7 hover:from-purple-500 hover:to-blue-500"
          onClick={() => {
            window.location.href = '/login';
          }}
          
        >
          Login
        </Button>
      </div>
    </nav>
  );
}
