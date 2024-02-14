import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const pagination_items = 7;

export default function Items() {
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(1);

  const [key, setKey] = useState(0);

  const divRef = useRef<HTMLDivElement>(null);

  const getallmods = async () => {
    try {
      const response = await axios.get("/api/items");
      setItems(response.data);
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
    const paginatedItems = items.slice(offset).slice(0, per_page);
    return paginatedItems;
  };

  const getPageCount = (items: any, per_page: number = pagination_items) => {
    return Math.ceil(items.length / per_page);
  };

  useEffect(() => {
    getallmods();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-white font-[600]">Items</h1>
      <div ref={divRef}>
        <div className="flex flex-col gap-5 mt-5 h-[750px]">
          {items && items.length ? (
            Paginate(items, page).map((item: any, number: number) => {
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  key={1}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: (0.5 * number) * 0.5 }}
                  className="flex gap-5 justify-between items-center bg-slate-500/20 rounded-md p-5"
                >
                  <div className="flex gap-5 items-center">
                    <Image
                      src={`/mc_assets/${item.tag_name.split("__")[0]}/${
                        item.tag_name
                      }.png`}
                      alt="item_image"
                      className="w-10 h-10"
                      width={50}
                      height={50}
                    ></Image>
                    <div>
                      <h1 className="text-white font-medium">
                        {item.item_name}
                      </h1>
                      <p className="text-gray-400">{item.tag_name}</p>
                    </div>
                  </div>
                  <div className="flex gap-x-2">
                    <button className="bg-green-500 text-white rounded-md px-4 py-2 font-[600]">
                      Edit
                    </button>
                    <button
                      className="bg-blue-500 text-white rounded-md px-4 py-2 font-[600]"
                      onClick={() => {
                        window.location.href = `/wiki/item/${item.tag_name}?&section=crafting`;
                      }}
                    >
                      View
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="flex flex-col gap-4 justify-center items-center mt-10">
              <span className="loader"></span>
              <p className="text-white">Loading Mods...</p>
            </div>
          )}
        </div>
        <Pagination>
          <PaginationContent className="flex gap-4 mt-5">
            <Button
              onClick={() => {
                if (page === 1) {
                  setPage(getPageCount(items));
                  setKey(getPageCount(items));
                } else {
                  setPage(page - 1);
                  setKey(page - 1);
                }
              }}
              variant="none"
            >
              {"<"}
            </Button>
            {Array.from({ length: getPageCount(items) }).map((_, index) => {
              return (
                <PaginationItem key={index} className="cursor-pointer ">
                  <PaginationLink
                    onClick={() => {
                      setPage(index + 1);
                      setKey(index + 1);
                    }}
                    isActive={index === page - 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <Button
              variant="none"
              onClick={() => {
                setPage(page + 1);
                if (page === getPageCount(items)) {
                  setPage(1);
                  setKey(1);
                } else {
                  setPage(page + 1);
                  setKey(page + 1);
                }
              }}
            >
              {">"}
            </Button>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
