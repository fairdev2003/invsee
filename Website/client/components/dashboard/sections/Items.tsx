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
import { motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { RiZzzFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserData } from "@/mongo_actions/addSomething";

const pagination_items = 5;

export default function Items() {
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [section, setSection] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isopen, setIsopen] = useState<boolean>(false);

  


  const searchParams = useSearchParams() as any;

  const [key, setKey] = useState(0);

  const router = useRouter();

  const divRef = useRef<HTMLDivElement>(null);

  const getallmods = async () => {
    try {
      const response = await axios.get("/api/items");
      setItems(response.data);
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
    const paginatedItems = items.slice(offset).slice(0, per_page);
    return paginatedItems;
  };

  const getPageCount = (items: any, per_page: number = pagination_items) => {
    return Math.ceil(items.length / per_page);
  };

  const handleDeafultImage = (e: any) => {
    e.target.onerror = null;
    e.target.src = "deafult.png";
  };

  useEffect(() => {
    getallmods();
  }, []);

  useEffect(() => {
    if (searchParams.has("page")) {
      setPage(parseInt(searchParams.get("page")));
    }
    if (searchParams.has("section")) {
      setSection(searchParams.get("section"));
    }
  }, [searchParams]);

  const toofarmessages = [
    "Too far!",
    "You've gone too far!",
    "There are no more items to show!",
  ];

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-white font-[600]">Items</h1>
      <div ref={divRef}>
        <div className="flex flex-col gap-5 h-[550px] mt-5">
          {items && items.length ? (
            Paginate(items, page).map((item: any, number: number) => {
              return (
                <div className="flex gap-5 justify-between items-center bg-slate-500/20 rounded-md p-5">
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
                      <p className="text-gray-400">
                        {item.mod[0] ? item.mod[0].mod_name : "Minecraft"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-x-2">
                    <Dialog
                      
                      onOpenChange={() => {
                        console.log("Dialog opened " + item.tag_name);
                      }}
                    >
                      <DialogTrigger>
                        <button className="bg-green-500 text-white rounded-md px-4 py-2 font-[600]">
                          Edit
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#26292f] p-7">
                        <div className="text-white font-medium flex items-center gap-x-4">
                          <Image
                            width={40}
                            height={40}
                            alt={item.tag_name}
                            src={`/mc_assets/${item.tag_name.split("__")[0]}/${
                              item.tag_name
                            }.png`}
                            onError={(event) => {
                              handleDeafultImage(event);
                            }}
                          ></Image>
                          <div className="flex flex-col">
                            <p>{item.item_name}</p>
                            <p className="text-sm text-blue-500">
                              {item.mod[0] ? item.mod[0].mod_name : "Minecraft"}
                            </p>
                          </div>
                        </div>
                        <DialogDescription className="text-gray-400">
                          You can edit this item here. If you want tutorial
                          about adding new mods please refer to this page:{" "}
                          <Link
                            href="https://www.google.pl"
                            className="text-blue-500 underline"
                          >
                            Tutorial Page
                          </Link>
                          . To add custom crafting to the item you need to
                          create this in other section named{" "}
                          <Link
                            href={window.location.href}
                            className="text-blue-500 underline"
                          >
                            crafting
                          </Link>
                        </DialogDescription>
                        <div className="flex gap-x-4 items-center justify-center">
                          <p className="text-white font-medium flex justify-center w-[100px]">
                            Item Name
                          </p>
                          <div className="flex gap-3 items-center h-7 rounded-md bg-[#32343a] py-6 px-3 text-white font-[500] w-[300px]">
                            <input
                              className="bg-transparent outline-none w-full"
                              type="text"
                              placeholder={item.item_name}
                            ></input>
                          </div>
                        </div>
                        <div className="flex gap-x-4 items-center justify-center">
                          <p className="text-white font-medium flex justify-center w-[100px]">
                            Mod Tag
                          </p>
                          <div className="flex gap-3 items-center h-7 rounded-md bg-[#32343a] py-6 px-3 text-white font-[500] w-[300px]">
                            <input
                              className="bg-transparent outline-none w-full"
                              type="text"
                              placeholder={item.mod_tag}
                            ></input>
                          </div>
                        </div>
                        <div className="flex gap-x-4 items-center justify-center">
                          <p className="text-white font-medium flex justify-center w-[100px]">
                            Description
                          </p>
                          <div className="flex gap-3 items-center h-7 rounded-md bg-[#32343a] py-6 px-3 text-white font-[500] w-[300px]">
                            <input
                              className="bg-transparent outline-none w-full"
                              type="text"
                              placeholder="Description"
                            ></input>
                          </div>
                        </div>
                        <DialogClose >
                          <Button variant="secondary">Submit</Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                    <button
                      className="bg-blue-500 text-white rounded-md px-4 py-2 font-[600]"
                      onClick={() => {
                        window.location.href = `/wiki/item/${item.tag_name}?&section=crafting`;
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <div className="flex flex-col gap-4 justify-center items-center mt-10">
                <span className="loader"></span>
                <p className="text-white">Loading Items...</p>
              </div>
            </div>
          )}
        </div>
        <Pagination>
          <PaginationContent className="flex gap-4 mt-10">
            <Button
              onClick={() => {
                if (page === 1) {
                  setPage(getPageCount(items));
                  setKey(getPageCount(items));
                  router.push(
                    window.location.href.split("?")[0] +
                      `?section=${section}` +
                      `&page=${getPageCount(items)} `
                  );
                } else {
                  setPage(page - 1);
                  setKey(page - 1);
                  router.push(
                    window.location.href.split("?")[0] +
                      `?section=${section}` +
                      `&page=${page - 1} `
                  );
                }
              }}
              variant="none"
              disabled={page === 1}
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
                      router.push(
                        window.location.href.split("?")[0] +
                          `?section=${section}` +
                          `&page=${index + 1} `
                      );
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
              disabled={page === getPageCount(items)}
              onClick={() => {
                setPage(page + 1);
                if (page === getPageCount(items)) {
                  setPage(1);
                  setKey(1);
                } else {
                  setPage(page + 1);
                  setKey(page + 1);
                }
                router.push(
                  window.location.href.split("?")[0] +
                    `?section=${section}` +
                    `&page=${page + 1} `
                );
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
