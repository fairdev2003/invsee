import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { trpc } from "@/app/_trpc/client";
import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";
import Image from "next/image";

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
    <div className="flex justify-center items-center text-white">
      <div className="flex text-center items-center flex-col gap-y-3 justify-center">
        <h1 className={`text-${color} font-[700] text-[40px] mt-10`}>
          {translations[language]["Mainpage"]["InfoSection"]["How about mods?"]}
        </h1>
        <p className="flex text-center justify-center w-[600px]">
          {translations[language]["Mainpage"]["InfoSection"]["Description"]}
        </p>
        <div>
          
        </div>

        <div className={`w-[900px] h-[500px] flex bg-gray-800 py-5 rounded-lg gap-6 mt-5 divide-x-4 divide-blue-500`}>
          <div className="w-[60%] rounded-l-lg h-full justify-start ml-5 mt-5 flex flex-col">
            <h1 className="text-2xl text-white font-[600]">{translations[language]["Mainpage"]["InfoSection"]["Card Title"]}</h1>
            <p className="mt-3">{translations[language]["Mainpage"]["InfoSection"]["Card Description"]}</p>
            <div className="bg-black w-full h-full my-5 rounded-xl">
            {!data.isLoading && data.data && data.data.length > 0 !== null ? <div className="flex flex-col gap-2 mt-10 p-5 rounded-xl mb-5 justify-center items-center">
              <p>{translations[language]["Mainpage"]["InfoSection"]["Served Data"]}</p>
              <p><span className="text-blue-500 font-[700]">{"{"}</span>{" "}<span className="text-green-500">item_name</span>: "{itemdata && itemdata.item_name !== null ? itemdata.item_name : null}"{" "}<span className="text-blue-500 font-[700]">{"}"}</span></p>
              <p><span className="text-blue-500 font-[700]">{"{"}</span>{" "}<span className="text-green-500">tag_name</span>: "{itemdata && itemdata.tag_name ? itemdata.tag_name.replace("__", ":") : null}"{" "}<span className="text-blue-500 font-[700]">{"}"}</span></p>
              <p><span className="text-blue-500 font-[700]">{"{"}</span>{" "}<span className="text-green-500">short_description</span>: "{itemdata && itemdata.short_description && itemdata.short_description.length > 0 ? itemdata.short_description : <span className="text-red-500">No data</span>}"{" "}<span className="text-blue-500 font-[700]">{"}"}</span></p>
              <p><span className="text-blue-500 font-[700]">{"{"}</span>{" "}<span className="text-green-500">mod_name</span>: "{itemdata && itemdata.mod && itemdata.mod.length > 0 ? itemdata.mod[0].mod_name : "Minecraft"}"{" "}<span className="text-blue-500 font-[700]">{"}"}</span></p>
            </div> : <p className="flex justify-center items-center mt-10">{translations[language]["Dashboard"]["Loading"]}</p>}
            </div>
          </div>
          <div className="w-[40%] rounded-r-lg h-full flex text-start justify-start p-5 flex-col">
            <h2 className="text-2xl font-[600]">{translations[language]["Mainpage"]["InfoSection"]["Search Items"]}</h2>
            <Input onChange={(input) => {
              data.mutate(input.currentTarget.value);
            }} 
            placeholder={translations[language]["Mainpage"]["InfoSection"]["Search"]} className="bg-blue-500 mt-3 text-white placeholder:text-white"></Input>
            <div className="flex flex-col gap-4 mt-4">
              {!data.isLoading && data.data ? data.data.map((item: any, index: number) => {
                  return (
                    <div onClick={() => {setItemData(item)}} className={`text-white hover:translate-x-3 transition-all cursor-pointer ${itemdata === item ? "bg-blue-700 translate-x-3" : "bg-blue-500"} h-[90px] rounded-lg p-5 flex items-center gap-5 truncate`}>
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
