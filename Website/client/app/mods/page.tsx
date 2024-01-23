"use client"

import Navbar from "@/components/navbar";
import axios from "axios";
import { useEffect, useState } from "react";


const Mods = () => {

    const [mods, setmods]= useState([])

    useEffect(() => {
        const fetchmods = async () => {
            const response: any = await axios.get("http://localhost:3001/api/mod");
            setmods(response.data)
            console.log(response)
        };
        fetchmods();
    });

    return (
        <div className="">
            <Navbar></Navbar>
            <div className="flex flex-grow-2 gap-10 mx-[50px]">
                <div className="bg-[#26292f] w-[600px] p-5 h-[850px] rounded-lg">
                    <h1 className="text-2xl font-[700] text-white m-5">Listed Mods</h1>
                    {mods.length > 0 && mods ? mods.map((mod: any, number: number) => {
                        return (
                            <div className="flex gap-3 m-5 bg-[#32343a] hover:bg-[#16181c] rounded-lg p-4 cursor-pointer">
                                <img className="w-[50px] h-[50p]x" src={mod.mod_image}></img>
                                <div className="flex flex-col">
                                    <h1 className="font-[800] text-lg text-white">{number + 1}. {mod.mod_name}</h1>
                                    <p className="font-[400] text-sm text-white">by <a className="hover:underline cursor-pointer">{mod.mod_owner}</a></p>
                                </div>
                            </div>
                        )
                    }): null}
                </div>
                <div className="bg-[#26292f] w-full h-[850px] rounded-lg">

                </div>
            </div>
        </div>
    )
}

export default Mods;