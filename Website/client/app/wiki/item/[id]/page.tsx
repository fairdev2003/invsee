"use client";

import { FetchSingleItem } from "@/lib/SingleItemFetch";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import SliderMenu from "@/components/SliderMenu";
import Content from "@/components/crafting_components/Content";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Page = ({ params }: { params: { id: string } }) => {
  const searchParams: any = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [item_data, setitem_data]: any = useState(null);
  const [section, setsection] = useState("");

  const fetch_item = async (id: string) => {
    try {
      const response: any = await axios.post(`/api/items/single`, {
        tag_name: id,
      });

      setTimeout(() => {
        setitem_data(response.data);
        console.log(response.data);
      }, 1000);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  useEffect(() => {
    fetch_item(params.id);
    console.log(item_data);
  }, [params.id]);

  useEffect(() => {
    if (searchParams.has("section")) {
      setsection(searchParams.get("section"));
    } else {
      setsection("overview");
    }
  }, [searchParams]);

  return (
    <section className="flex justify-center mb-10">
      {item_data ? (
        <div>
          <div className="flex gap-3">
            <div className="w-1/3 bg-[#26292f] rounded-lg flex justify-center items-center p-10">
              <Image
                alt="item_image"
                width={150}
                height={150}
                src={`/mc_assets/${item_data.tag_name.split("__")[0]}/${
                  item_data.tag_name
                }.png`}
              ></Image>
            </div>
            <div className="w-[1000px] rounded-lg p-10 bg-[#26292f]">
              <header className="mb-10">
                <h1 className="text-blue-500 font-[600] text-3xl">
                  <span>{item_data.mod[0] ? item_data.mod[0].mod_name : "Minecraft" }</span> <span className="text-white">|</span>{" "}
                  {item_data.item_name}
                </h1>
              </header>
              <div className="flex gap-3"></div>
            </div>
          </div>

          <div className="h-[1000px] w-auto bg-[#26292f] mt-5 p-10 rounded-lg">
            <SliderMenu item_tag={item_data.tag_name}></SliderMenu>
            <Content
              section={section}
              data={item_data.crafting_recipes}
            ></Content>
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
