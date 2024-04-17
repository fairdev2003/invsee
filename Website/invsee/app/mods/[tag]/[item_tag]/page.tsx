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
  }, [params, tag, itemtag]);

  const getMod = () => {
    const returnData = mod.data?.data[0].items.filter(
      (item) => item.item_tag === params?.item_tag
    );
    console.log(returnData);

    return { data: returnData };
  };

  return (
    <div className="text-white grid grid-cols-5 gap-x-3 h-[90vh] p-4">
      <div className="bg-[#1C1A1A] flex flex-col p-4 justify-center col-span-1 rounded-3xl">
        {!mod.isLoading &&
          getMod()
            .data?.slice(0, 1)
            .map((item: any) => {
              return <div className="text-red-500">{item.item_name}</div>;
            })}

        {mod.data?.data[0].items.map((item: any, number: number) => {
          return (
            <div className="cursor-pointer hover:text-blue-500">
              <p
                onClick={() => {
                  router.push(`/mods/${tag}/${item.item_tag}`);
                  setTag(params?.tag);
                  setItemTag(params?.item_tag);
                }}
                className="text-white"
              >
                {item.item_name}
              </p>
            </div>
          );
        })}
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
