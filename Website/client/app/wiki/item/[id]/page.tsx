"use server";

import Image from "next/image";
import { connectMongo } from "@/app/api/mongo/mongo";
import { Content } from "next/font/google";
import { AddItemModal } from "@/components/dashboard/Modal";
import WikiContent from "@/components/wiki/WikiContent";
import { Suspense } from "react";
import { getAllItems, getItemById, searchItems } from "@/actions/itemActions";
import { useSearchParams } from "next/navigation";

  const Page = async ({
    params,
    searchParams,
  }: {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  } ) => {
  
  const Item: any  = await getItemById(params.id);
  Item._id = Item._id.toString();

  console.log(searchParams)

  return (
    <section className="flex justify-center mb-10">
      {Item ? (
        <div>
          <div className="flex gap-3">
            <div className="w-1/3 bg-[#26292f] rounded-lg flex justify-center items-center p-10">
              <Image
                alt="item_image"
                width={150}
                height={150}
                src={`/mc_assets/${Item.tag_name.split("__")[0]}/${
                  Item.tag_name
                }.png`}
              ></Image>
            </div>
            <div className="w-[1000px] rounded-lg p-10 bg-[#26292f]">
              <header className="mb-10">
                <h1 className="text-blue-500 font-[600] text-3xl">
                  <span>{Item.mod.length > 0 ? Item.mod[0].mod_name : "Minecraft"}</span> <span className="text-white">|</span>{" "}
                  {Item.item_name}
                </h1>
              </header>
              <div className="flex gap-3">
                <p className="text-white mt-5">{Item.short_description}</p>
              </div>
            </div>
          </div>

          <div className="h-[1000px] w-auto bg-[#26292f] mt-5 p-10 rounded-lg">

            <Suspense fallback={<div>Loading...</div>}>
              <WikiContent data={Item} section={searchParams?.section} className="bg-blue-500"></WikiContent>
            </Suspense>

          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-3">
          <span className="loader"></span>
          <p className="text-white font-[600]">Loading Item</p>
        </div>
      )}
    </section>
  );
};

export default Page;