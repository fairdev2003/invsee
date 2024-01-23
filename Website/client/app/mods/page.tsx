"use client"

import Navbar from "@/components/navbar";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Loader from 'react-loaders'
import "../../app/globals.css"

import { useSearchParams, useRouter, usePathname } from 'next/navigation'


const Mods = () => {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    

    const [mods, setmods]: any = useState([])
    const [moditems, setmoditems] = useState([])
    const [modselected, setmodselected]: any = useState("")
    const [loading, setloading] = useState(false)

    const fetchitems = async () => {
        try {
            const response: any = await axios.get(`http://localhost:3005/api/item/${modselected}`,);
            setmoditems(response.data);
        } catch (error) {
            console.error("Error fetching mods:", error);
        } finally {
            setloading(false);
        }
    };

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)

          setmodselected(value)
     
          return params.toString()
        },
        [searchParams]
      )

      

      useEffect(() => {
        setloading(true);

        
    
        const fetchmods = async () => {
            try {
                const response: any = await axios.get("http://localhost:3005/api/mod");
                setmods(response.data);
            } catch (error) {
                console.error("Error fetching mods:", error);
            } finally {
                
                setloading(false);
            }
        };
    
        fetchmods();
    }, []);

    useEffect(() => {
        if (searchParams.has('mod')) {
            setmodselected(searchParams.get('mod'));
        }
        fetchitems()
    }, [searchParams]);



    const getMod = () => {
            const new_mod = mods.filter((item: any) => item.mod_tag === modselected);
            console.log(new_mod);
            return new_mod;
    }

    return (
        <div className="">
            <Navbar></Navbar>
            <div className="flex flex-grow-2 gap-10 mx-[50px]">
                <div className="bg-[#26292f] border-[#464444] border-[2px] w-[800px] p-5 h-[850px] rounded-lg">
                    <h1 className="text-2xl font-[700] text-white m-5">Listed Mods:</h1>
                    {mods.length > 0 && mods ? mods.map((mod: any, number: number) => {
                        return (
                            <div className={`flex gap-3 m-5 bg-[#32343a] hover:bg-[#26292e] rounded-lg p-4 cursor-pointer  border-${mod.mod_tag === modselected ? "white border-[2px]" : "[#464444] border-[2px]"}`} onClick={() => {
                                router.push(pathname + "?" + createQueryString('mod', mod.mod_tag))
                                console.log(searchParams.get("mod"))
                            }}>
                                <img className="w-[50px] h-[50p]x rounded-lg" src={mod.mod_image}></img>
                                <div className="flex flex-col">
                                    <h1 className="font-[800] text-lg text-white">{number + 1}. {mod.mod_name}</h1>
                                    <p className="font-[400] text-sm text-white">by <a className="hover:underline cursor-pointer"></a>{mod.mod_owner}</p>
                                </div>
                            </div>
                        )
                    }): <div className="flex justify-center items-center h-[600px]"><span className="loader"/></div>}
                </div>
                <div className="bg-[#26292f] border-[#464444] border-[2px] w-full h-[850px] rounded-lg">
                    {mods && mods.length > 0 ? <div className="p-10">
                        <div className="flex flex-col bg-[#32343a] border-[2px] border-[#464444] p-5 rounded-lg">
                            <div className="flex gap-4 ">
                                <img className="w-[100px] h-[100px]" src={getMod()[0].mod_image}></img>
                                <div>
                                    <h1 className="text-white font-[700] text-lg">{getMod()[0].mod_name}</h1>
                                    <p className="text-[13px] text-white font-[500]">by {getMod()[0].mod_owner}</p>
                                    <p className="text-[13px] text-white font-[500]">Released: {getMod()[0].release_data}</p>
                                    <p className="text-[13px] text-white font-[500]">Supported modloaders: {getMod()[0].mod_loaders.toString()}</p>
                                </div>
                                
                            </div>
                            <p className="text-white text-sm font-[500] mt-4">{getMod()[0].mod_description}</p>
                        </div>
                        <div className="bg-[#26292f] border-[#464444] border-[2px] w-full h-[570px] rounded-lg mt-2 flex p-6">
                            {moditems ? moditems.map((item: any) => {
                                return (<div className="bg-[#32343a] w-[auto] h-[150px] p-5 flex flex-col items-center rounded-lg">
                                    <img className='w-[75px] h-[75px] items-center' src={item.item_image}/>
                                    <h2 className="text-white items-center">{item.item_name}</h2>
                                </div>)
                            }): <p className="text-white">Nothing found</p>}
                        </div>
                        
                    </div>: <div className="flex justify-center items-center h-[800px]"><span className="loader"/></div>}
                </div>
            </div>
        </div>
    )
}

export default Mods;