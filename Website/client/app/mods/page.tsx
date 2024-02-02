"use client"

import Navbar from "@/components/navbar";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "../../app/globals.css"
import "./mods.css"
import { BsSearch, BsThreeDots } from "react-icons/bs";
import { TbSitemap } from "react-icons/tb";
import { RiGuideFill } from "react-icons/ri";
import { IoUnlinkOutline, IoHeartOutline, IoHeart } from "react-icons/io5";


import { dbConnect } from "../../db/dbConnection";



import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Text } from "lucide-react";
import Link from "next/link";




const Mods = () => {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    

    const [mods, setmods] = useState<any>([])
    const [modselected, setmodselected] = useState<any>("")
    const [loading, setloading] = useState<any>(false)
    const [section, setsection] = useState<any>("")
    const [tempmod, settempmod] = useState<any>([])

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
                const response: any = await axios.get("/api/mods");
                setmods(response.data);
                console.log(response.data)
                settempmod(response.data)

            } catch (error) {
                console.error("Error fetching mods:", error);
            } finally {
                
                setloading(false);
            }
        };

        if (searchParams.has('mod')) {
            setmodselected(searchParams.get('mod'));
            
        };
    
        fetchmods();

    }, []);

    useEffect(() => {
        if (searchParams.has("section")) {
            setsection(searchParams.get("section"))
        };

        if (searchParams.has('mod')) {
            setmodselected(searchParams.get('mod'));
            
        }
        

        
    }, [searchParams]);
    


    const getMod = () => {
            const new_mod = mods.filter((item: any) => item.mod_tag === modselected);

            return new_mod[0];
    }
 
    const filterSearch = (query: string, modselected: string) => {
        
    }

    

    return (
        <div className="">
            <div className="flex flex-grow-2 gap-10 mx-[50px]">
                <div className="bg-[#26292f] border-[#464444] border-[2px] w-[800px] p-5 h-[950px] rounded-lg">
                    <h1 className="text-2xl font-[700] text-white m-5">Listed Mods:</h1>
                    {mods.length > 0 && mods ? mods.map((mod: any, number: number) => {
                        return (
                            <div key={mod} className={`flex gap-3 m-5 select-none bg-[#32343a] hover:bg-[#353b44] rounded-lg p-4 cursor-pointer border-${mod.mod_tag === modselected ? "white border-[3px]" : "[#464444] border-[2px]"}`} onClick={() => {
                                router.push(
                                    `/mods?mod=${mod.mod_tag}&section=items`
                                  );
                            }}>
                                <Image alt={`mod_image__${modselected}`} width={50} height={50} className='rounded-lg' src={mod.mod_image}></Image>
                                <div className="flex flex-col">
                                    <h1 className="font-[800] text-lg text-blue-500">{mod.mod_name}</h1>
                                    <p className="font-[400] text-sm text-white">by <a className="hover:underline cursor-pointer"></a>{mod.mod_owner}</p>
                                </div>
                            </div>
                        )
                    }): <div className="flex justify-center items-center h-[600px]"><span className="loader"/></div>}
                </div>
                <div className="bg-[#26292f] border-[#464444] border-[2px] w-[1500px] h-[950px] rounded-lg">
                    {mods && mods.length > 0 ? <div className="p-10">
                        <div className="flex flex-col bg-[#32343a] border-[2px] border-[#464444] p-5 rounded-lg mb-6 h-[230px]">
                            <div className="flex gap-4">
                                <Image alt={`mod-${modselected}`} className="rounded-lg" src={getMod().mod_image} loading="eager" quality={100} width={85} height={85}></Image>
                                <div>
                                    <h1 className="text-white font-[700] text-lg">{getMod().mod_name}</h1>
                                    <p className="text-[13px] text-white font-[500]">by {getMod().mod_owner}</p>
                                    <p className="text-[13px] text-white font-[500]">Released: {getMod().release_data}</p>
                                    <p className="text-[13px] text-white font-[500]">Supported modloaders: {getMod().mod_loaders.toString()}</p>
                                </div>
                               
                            </div>
                            
                            
                        </div>
                        <div className="h-[50px] flex gap-4">
                            <Button style={{color: `${section === "items" ? "rgb(59 130 246 / 1" : "white"}`}} className={`flex gap-2 h-[40px] font-bold bg-[#32343a] hover:bg-[#353b44]`} onClick={() => {
                                router.push(
                                    `/mods?mod=${modselected}&section=items`
                                  );
                            }}><div className="text-[20px]"><TbSitemap/></div>Items</Button>
                            <Button style={{color: `${section === "guides" ? "rgb(59 130 246 / 1" : "white"}`}} className={`flex gap-2 h-[40px] font-bold bg-[#32343a] hover:bg-[#353b44]`} onClick={() => {
                                router.push(
                                    `/mods?mod=${modselected}&section=guides`
                                  );
                            }}><div className="text-[20px]"><RiGuideFill/></div>Guides</Button>
                            <Button style={{color: `${section === "links" ? "rgb(59 130 246 / 1" : "white"}`}} className={`flex gap-2 h-[40px] font-bold bg-[#32343a] hover:bg-[#353b44]`} onClick={() => {
                                router.push(
                                    `/mods?mod=${modselected}&section=links`
                                  );
                            }}><div className="text-[20px]"><IoUnlinkOutline/></div>Links</Button>
                            <Button className={`h-[40px] font-bold bg-[#32343a] text-white hover:bg-[#353b44]`} onClick={() => {
                                
                            }}>+</Button>
                        </div>
                        
                        {section === "items" ? <div className="bg-[#26292f] border-[#464444] border-[2px] w-full h-[520px] rounded-lg mt-2 flex flex-col p-6 gap-2">
                            
                            <div className="flex justify-start gap-2 items-center mb-5">
                                <div className="flex gap-3 items-center h-10 rounded-md bg-[#32343a] py-6 px-3 text-white font-[600] w-[300px]">
                                    <BsSearch></BsSearch>
                                    <input className="bg-transparent outline-none" onChange={(input) => {}}></input>
                                </div>
                                <Link className=" flex  items-center" href='/wiki/wiki_element_creation'><Button style={{color: "rgb(59 130 246 / 1"}} className={`flex gap-2 h-[50px] font-bold bg-[#32343a] hover:bg-[#353b44]`}><div className="text-[20px]"><PlusCircle/></div>Add Item</Button></Link>
                            </div>
                            
                            <div id="items-box" className="flex flex-wrap overflow-y-scroll gap-4 items-center">
                                {getMod().items.map((item: any, number: number) => {
                                    return (<Link href={`/wiki/item/${item.tag_name}?section=overview`} id="item-div" className="bg-[#32343a] w-[48%] h-[120px] p-10 flex rounded-lg gap-8 items-center relative cursor-pointer hover:bg-[#353b44]">
                                        <Image alt={item.tag_name + number} width={55} height={55} className='items-center' src={item.item_image}/>
                                        <div id="settings" className="group absolute hidden z-3 right-7 rounded-full bg-[#26292f] cursor-pointer text-white text-[25px] p-3">
                                            <div>
                                                <IoHeartOutline className='flex group-hover:hidden'/>
                                                <IoHeart className='hidden group-hover:flex text-red-500'/>
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className="font-[700] text-white">{item.item_name}</h1>
                                            <p className="text-gray-400">{item.tag_name.replace("__", ":")}</p>
                                        </div>
                                    </Link>)
                                })}
                            </div>
                            
                        </div> : null}

                        {section === "guides" ? <div className="bg-[#26292f] border-[#464444] border-[2px] w-full h-[520px] rounded-lg mt-2 flex flex-col p-6 gap-2">
                            <div className="flex gap-3 items-center mb-5 h-10 rounded-md bg-[#32343a] py-6 px-3 text-white font-[600] w-[300px]">
                                <BsSearch></BsSearch>
                                <input className="bg-transparent outline-none"></input>
                            </div>
                            <div id="items-box" className="flex flex-wrap overflow-y-scroll gap-2 items-center justify-center h-[90%]">
                                <p className="text-white font-[600]">Oops, Nothing found!</p>
                            </div>
                        </div> : null}

                        {section === "links" ? <div className="bg-[#26292f] border-[#464444] border-[2px] w-full h-[520px] rounded-lg mt-2 flex flex-col p-6 gap-2">
                            <div className="flex gap-3 items-center mb-5 h-10 rounded-md bg-[#32343a] py-6 px-3 text-white font-[600] w-[300px]">
                                <BsSearch></BsSearch>
                                <input className="bg-transparent outline-none"></input>
                            </div>
                            <div id="items-box" className="flex flex-wrap overflow-y-scroll gap-2 items-center justify-center h-[90%]">
                                <p className="text-white font-[600]">Oops, Nothing found!</p>
                            </div>
                        </div> : null}
                        
                    </div>: <div className="flex justify-center items-center h-[800px]"><span className="loader"/></div>}
                </div>
            </div>
        </div>
    )
}

export default Mods;