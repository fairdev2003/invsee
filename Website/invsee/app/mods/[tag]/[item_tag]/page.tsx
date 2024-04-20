"use client";

import { trpc } from "@/app/_trpc/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Media from "@/components/Media";
import { useResize } from "@/lib/hooks/useResize";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Item, ItemInfo, Mod } from "@prisma/client";
import Card from "./(components)/CopyCard";
import WikiHeader from "./(components)/Header";
import { ItemSlot } from "@/components/Item/ItemStack";
import { ItemCard } from "./(components)/ItemCard";

const ZodTagName = z.string().includes("__");
type TagName = z.infer<typeof ZodTagName>;

interface Items {
  items: Item[];
}

type ModType = Mod & Items;

const ModPage = (id: { tag: string; item_tag: string }) => {
  const params = useParams();
  const router = useRouter();

  const mod = trpc.mods.getFilteredMods.useMutation();

  const [tag, setTag] = useState<any>(params?.tag);
  const [itemtag, setItemTag] = useState<string | undefined | string[]>(
    params?.tag
  );



  const resizeValue = useResize();

  useEffect(() => {
    mod.mutate({
      by: "tag",
      value: params?.tag,
    });
  }, []);

  useEffect(() => {
    getMod();
  }, [params]);

  const getMod = () => {
    const returnData = mod.data?.data[0].items.filter(
      (item) => item.item_tag === params?.item_tag
    );
    console.log(returnData);

    return { data: returnData };
  };

  return (
    
    <div className="text-white grid grid-cols-5 gap-x-3 h-[90vh] p-4">
      <div className="bg-[#1C1A1A] flex flex-col p-4 col-span-1 rounded-3xl gap-y-3">

        
        <div className="h-20 flex items-center gap-x-3 mx-2 ">
          <div>
            {/* @ts-ignore */}
            <Image className="rounded-full" width={70} alt={`${mod.data?.data[0].id}`} src={mod.data?.data[0].image_src} width={50} height={50}/> 
          </div>
          <div className="">
            {/* @ts-ignore */}
            <p className="font-semibold">{mod && mod?.data?.data.length > 0 ? getMod().data[0].item_name : null}</p>
            <p className="font-medium text-sm text-gray-400">made by <span className="hover:underline hover:text-blue-500 cursor-pointer">{mod.data?.data[0].items[0].author.nick}</span></p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          {mod.data?.data[0].items.slice(0, 7).map((item: any) => {
            return (
              <ItemCard key={item.id} itemName={item.item_name} ImageSrc={`https://res.cloudinary.com/dzaslaxhw/image/upload/v1709745445/${tag}/${item.item_tag}.png`} itemTag={item.item_tag} type={item.type} />
            )
          })}
        </div>

               
      </div>
      
      <WikiHeader func={getMod} mod={mod} tag={tag}/>
        
      <div className="justify-center col-span-1 rounded-xl grid grid-rows-4 grid-cols-1 gap-y-4">
        
        <div className="bg-[#1C1A1A] w-full rounded-3xl flex justify-center items-center">
          
          <div className="grid grid-rows-3 h-full gap-3 p-6 w-full">
            <Card key="ID" value={mod.data?.data[0].id}></Card>
            {/* @ts-ignore */}    
            <Card key="Tag Name" value={params?.item_tag?.replace("__", ":")}></Card>
            <Card key="Tag Name" value={mod.data?.data[0].modName}></Card>
            
          </div>
          
        </div>
        
        <div className="bg-[#1C1A1A] flex w-full row-span-3 rounded-3xl">

        </div>
      </div>
    </div>
  );
};

export default ModPage;
