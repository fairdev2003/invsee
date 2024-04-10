"use client";

import { trpc } from "@/app/_trpc/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Media from "@/components/Media";
import { useResize } from "@/lib/hooks/useResize";
import { Button } from "@/components/ui/button";

const ModPage = (id: { tag: string; item_tag: string }) => {
  const params = useParams();

  const mod = trpc.mods.getFilteredMods.useMutation();

  const resizeValue = useResize()

  useEffect(() => {
    mod.mutate({
      by: "tag",
      value: params?.tag,
    });
  }, []);

  return (
    <div className="text-white grid grid-cols-5 gap-x-3 h-[90vh] p-4">
      <div className="bg-[#1C1A1A] flex justify-center col-span-1 rounded-3xl">
        <Button onClick={() => {console.log(resizeValue)}}>Check Resize Value</Button>
      </div>
      <div className="justify-center col-span-3 rounded-xl grid grid-rows-4 grid-cols-1 gap-y-4">
        <div className="bg-[#1C1A1A] flex row-span-1 w-full rounded-3xl">
          {mod.data && mod.data?.data.length > 0
            ? mod.data?.data[0].items[0].gallery.map((image: any) => {
                return (
                  <div>
                    
                    <Image
                      width={200}
                      height={200}
                      alt={`${image.id}`}
                      src={image.image_src}
                    ></Image>
                  </div>
                );
              })
            : null}
        </div>
        <div className="bg-[#1C1A1A] flex w-full row-span-3 rounded-3xl">
          <Media src="https://res.cloudinary.com/dzaslaxhw/video/upload/v1711740515/destroyme.mp3" size="large" type='music'/>
        </div>
      </div>
      <div className="justify-center col-span-1 rounded-xl grid grid-rows-4 grid-cols-1 gap-y-4">
        <div className="bg-[#1C1A1A] flex row-span-1 w-full rounded-3xl"></div>
        <div className="bg-[#1C1A1A] flex w-full row-span-3 rounded-3xl"></div>
      </div>
    </div>
  );
};

export default ModPage;
