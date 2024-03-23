import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const pagination_items = 5;

export default function Mods() {
  const [mods, setMods] = useState<any>([]);
  const [page, setPage] = useState(1);

  const divRef = useRef<HTMLDivElement>(null);

  const getallmods = async () => {
    try {
      const response = await axios.get("/api/mods");
      setMods(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const Paginate = (
    items: any,
    page: number = 1,
    per_page: number = pagination_items
  ) => {
    const offset = (page - 1) * per_page;
    const paginatedItems = mods.slice(offset).slice(0, per_page);
    return paginatedItems;
  };

  const getPageCount = (mods: any, per_page: number = pagination_items) => {
    return Math.ceil(mods.length / per_page);
  };

  useEffect(() => {
    getallmods();
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-white font-[600]">Mods</h1>
      <div ref={divRef} className="flex flex-col gap-5 mt-5">
        {mods && mods.length ? (
          Paginate(mods, page).map((item: any) => {
            return (
              <div className="flex gap-5 justify-between items-center bg-slate-500/20 rounded-md p-5">
                <div className="flex gap-5 items-center">
                  <Image
                    src={item.mod_image}
                    alt="mod_image"
                    width={50}
                    height={50}
                    className="rounded-md">
                    </Image>
                  <div>
                    <h1 className="text-white font-medium">{item.mod_name}</h1>
                    <p className="text-gray-400">{item.mod_owner}</p>
                  </div>
                </div>
                <div className="flex gap-x-2">
                  <button className="bg-green-500 text-white rounded-md px-4 py-2 font-[600]">
                    Edit
                  </button>
                  <button className="bg-blue-500 text-white rounded-md px-4 py-2 font-[600]" onClick={() => {
                    window.location.href = `/wiki/item/botania__terra_pick?&section=crafting`;
                  }}>
                    View
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center mt-10">
            <span className="loader"></span>
            <p className="text-white">Loading Mods...</p>
          </div>
        )}
        <Pagination>
          <PaginationContent>
            {Array.from({ length: getPageCount(mods) }).map((_, index) => {
              return (
                <PaginationItem
                  key={index}
                  className="cursor-pointer "
                >
                  <PaginationLink onClick={() => {
                    setPage(index + 1)
                    window.scrollTo({ 
                        top: 0,
                        behavior: 'smooth' 
                      });
                }} isActive={index === page - 1}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
