'use client'

import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { trpc } from "@/app/_trpc/client";
import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";
import Image from "next/image";
import Arrow from "@/assets/curly-arrow-2.png";
import { motion } from "framer-motion";
import { set } from "mongoose";

import './mainpage_styles.css'

const InfoSection = () => {

  const { language, color } = usePersistStore();
  const [itemdata, setItemData] = React.useState<any>({});

  const data = trpc.items.getItemByQuery.useMutation(
    {
      onSettled: (data) => {
        
        setItemData(data[0]);
      },
    }
  );
  useEffect(() => {
    data.mutate("");
    
  }, [])

  return (
    <div className="flex flex-col md:flex-row justify-center items-center text-white relative z-2 md:scale-[90%] lg:scale-100 w-full sm:flex-col">
      {/* <div className="absolute top-[120px] right-0 md:hidden sm:hidden overflow-hidden">
          <Image src={Arrow} className="rotate-90" alt="iron_ingot" width={100} height={100}></Image>
          <p className="text-white absolute top-[60px] left-[140px] text-start w-[400px]">{translations[language]["Mainpage"]["InfoSection"]["Search live items"]}</p>
      </div> */}
      {/* <div className="absolute top-[150px] -left-[120px] md:hidden sm:hidden overflow-hidden">
          <Image src={Arrow} id='arrow-2' className="md:hidden sm:hidden overflow-hidden" alt="iron_ingot" width={100} height={100}></Image>
          <p className="text-white absolute top-[120px] -left-10">{translations[language]["Mainpage"]["InfoSection"]["Easy to use"]}</p>
      </div> */}
      <div className="flex text-center items-center flex-col gap-y-3 justify-center w-full sm:flex-col lg:w-[900px] overflow-hidden">
        <h1 className={`text-${color} font-[700] text-[40px] mt-10`}>
          {translations[language]["Mainpage"]["InfoSection"]["How about mods?"]}
        </h1>
        <p className="flex text-center justify-center w-[300px] w-[600px] mx-5">
          {translations[language]["Mainpage"]["InfoSection"]["Description"]}
        </p>
        <div>
          
        </div>

        <div className={`lg:flex-row flex flex-col lg:w-full sm:w-full items-center text-center w-full bg-gray-800 py-5 rounded-lg gap-6 mt-5 divide-x-4 divide-blue-500 md:scale-[90%] lg:scale-100`}>
          <div className="w-full sm:w-[100%] md:w-[60%] rounded-l-lg h-full justify-start ml-5 mt-5 flex flex-col">
            <h1 className="text-2xl text-white font-[600] max-w-[300px]">{translations[language]["Mainpage"]["InfoSection"]["Card Title"]}</h1>
            <p className="mt-3">{translations[language]["Mainpage"]["InfoSection"]["Card Description"]}</p>
            <div className="bg-black h-[400px] overflow-hidden my-5 rounded-xl sm:w-full md:w-full">
              {itemdata && !data.isLoading && data.data && data.data.length > 0 !== null ? <motion.div initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}} transition={{duration: 0.5}} key={itemdata} className="flex flex-col gap-2 mt-10 p-5 rounded-xl mb-5 justify-center items-center">
                <p>{translations[language]["Mainpage"]["InfoSection"]["Served Data"]}</p>
                <p><span className="text-blue-500 font-[700]">{"{"}</span>{" "}<span className="text-green-500">item_name</span>: "{itemdata && itemdata.item_name !== null ? itemdata.item_name : null}"{" "}<span className="text-blue-500 font-[700]">{"}"}</span></p>
                <p><span className="text-blue-500 font-[700]">{"{"}</span>{" "}<span className="text-green-500">tag_name</span>: "{itemdata && itemdata.tag_name ? itemdata.tag_name.replace("__", ":") : null}"{" "}<span className="text-blue-500 font-[700]">{"}"}</span></p>
                <p><span className="text-blue-500 font-[700]">{"{"}</span>{" "}<span className="text-green-500">short_description</span>: "{itemdata && itemdata.short_description && itemdata.short_description.length > 0 ? itemdata.short_description : <span className="text-red-500">No data</span>}"{" "}<span className="text-blue-500 font-[700]">{"}"}</span></p>
                <p><span className="text-blue-500 font-[700]">{"{"}</span>{" "}<span className="text-green-500">mod_name</span>: "{itemdata && itemdata.mod && itemdata.mod.length > 0 ? itemdata.mod[0].mod_name : "Minecraft"}"{" "}<span className="text-blue-500 font-[700]">{"}"}</span></p>
              </motion.div> : null}
            </div>
          </div>
          <div className="w-full sm:w-[100%] md:w-[40%] sm:mt-5 md:mt-0 rounded-r-lg h-full flex text-start justify-start p-5 flex-col">
            <h2 className="text-2xl font-[600]">{translations[language]["Mainpage"]["InfoSection"]["Search Items"]}</h2>
            <Input onChange={(input) => {
              data.mutate(input.currentTarget.value);
            }} 
            placeholder={translations[language]["Mainpage"]["InfoSection"]["Search"]} className="bg-blue-500 mt-3 text-white placeholder:text-white"></Input>
            <div className="flex flex-col gap-4 mt-4">
              {!data.isLoading && data.data ? data.data.map((item: any, index: number) => {
                  return (
                    <div onClick={() => {
                      if (item === itemdata) {
                        setItemData(item);
                      } else {
                        setItemData(null)
                        setTimeout(() => {
                          setItemData(item);
                        }, 10)
                      }                  
                      }} className={`text-white hover:translate-x-3 transition-all cursor-pointer w-full ${itemdata === item ? "bg-blue-700 translate-x-3" : "bg-blue-500"} h-[90px] rounded-lg p-5 flex items-center gap-5 truncate`}>
                      <Image
                      src={`/mc_assets/${item.tag_name.split("__")[0]}/${
                        item.tag_name
                      }.png`}
                      alt="item_image"
                      className="w-10 h-10"
                      width={70}
                      height={70}></Image>
                      <div className="flex flex-col px-2">
                        <h1 className="text-lg font-[600]">{item && item.item_name.length > 15 ? item.item_name.substring(0,15) + "..." : item.item_name}</h1>
                        <p className="text-sm">{item.mod && item.mod.length > 0 ? item.mod[0].mod_name : "Minecraft"}</p>
                      </div>
                    </div>)
              }) : <p className="flex justify-center">{translations[language]["Dashboard"]["Loading"]}</p>}
              <div className="flex gap-3 justify-center items-center">
                <div className="h-1 rounded-full w-[30%] bg-blue-500 mt-1"></div>
                <div className="h-1 rounded-full w-[30%] bg-blue-500 mt-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;

