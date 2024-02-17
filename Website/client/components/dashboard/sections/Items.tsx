import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PaginationComponent from "@/components/PaginationComponent";
import { Textarea } from "@/components/ui/textarea";
import { get } from "http";
import { Input } from "@/components/ui/input";

const pagination_items = 5;

export default function Items() {
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [section, setSection] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isopen, setIsopen] = useState<boolean>(false);

  const searchParams = useSearchParams() as any;

  const [nameRef, mod_tagRef, descriptionRef, searchRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLTextAreaElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [key, setKey] = useState(0);

  const router = useRouter();

  const divRef = useRef<HTMLDivElement>(null);

  const getallItems = async () => {
    try {
      const response = await axios.get("/api/items");
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const Search = async (query: any) => {
    try {
      const response = await axios.post(`/api/items/search`, {item_name: query});
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

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
    getallItems();
  }, []);

  useEffect(() => {
    if (searchParams.has("page")) {
      setPage(parseInt(searchParams.get("page")));
    }
    if (searchParams.has("section")) {
      setSection(searchParams.get("section"));
    }
  }, [searchParams]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  return ( 
    <div className="flex flex-col">
      <h1 className="text-2xl text-white font-[600]">Items</h1>
      <div className="flezx gap-x-4 items-center mt-5">
        <p className="text-white font-medium flex w-[100px]">
          Search Items
        </p>
        <div className="flex gap-3 items-center h-7 rounded-md bg-[#32343a] py-6 px-3 text-white font-[500] w-[300px] mt-2">
          <input
            ref={searchRef}
            className="bg-transparent outline-none w-full"
            type="text"
            placeholder='Search...'
            onChange={(input) => {
              if (input.currentTarget.value === "") {
                getallItems();
              } else {
                Search(input.currentTarget.value);
                setPage(1);
                router.push(
                  `${window.location.pathname}?page=1&section=items`
                )
              }
            
            }}
          ></input>
        </div>
      </div>
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
                      <h1 className="text-white font-medium hover:underline cursor-pointer">
                        {item.item_name}
                      </h1>
                      <p className="text-blue-500 text-sm hover:underline cursor-pointer">
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
                              ref={nameRef}
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
                              ref={mod_tagRef}
                              className="bg-transparent outline-none w-full"
                              type="text"
                              placeholder={item.mod_tag}
                            ></input>
                          </div>
                        </div>

                        <DialogDescription></DialogDescription>

                        <div className="flex gap-x-4 items-center justify-center">
                          <p className="text-white font-medium flex justify-center w-[100px]">
                            Description
                          </p>
                          <div className="flex gap-3 items-center rounded-md bg-[#32343a] text-white font-[500] w-[300px] h-auto">
                            <textarea
                              ref={descriptionRef}
                              className="bg-transparent w-full h-full outline-none mx-3 my-6 max-h-[300px] min-h-[50px]"
                              placeholder="Description..."
                            />
                          </div>
                        </div>

                        <DialogDescription className="text-gray-400">
                          Provide some short desription to this item. More words
                          can be added in{" "}
                          <Link
                            href="https://www.google.pl"
                            className="text-blue-500 underline"
                          >
                            Wiki Section
                          </Link>
                          . For more info please visit this site{" "}
                          <Link
                            href="https://www.google.pl"
                            className="text-blue-500 underline"
                          >
                            Tutorial Page
                          </Link>
                        </DialogDescription>
                        <DialogClose>
                          <Button
                            variant="secondary"
                            onClick={async () => {
                              const data_to_update: any = {
                                tag_name: item.tag_name,
                                update_data: {
                                  item_name: nameRef.current?.value,
                                  mod_tag: mod_tagRef.current?.value,
                                  short_description:
                                    descriptionRef.current?.value,
                                },
                              };

                              await axios.post(
                                `/api/items/update/${item.tag_name}`,
                                data_to_update
                              );
                              setItems([]);
                              if (searchRef.current?.value) {
                                Search(searchRef.current?.value);
                              } else {
                                getallItems();
                              }
                            }}
                          >
                            Submit
                          </Button>
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
        <PaginationComponent
          items={items}
          number_of_items={getPageCount(items)}
          getPageCount={getPageCount}
        />
      </div>
    </div>
  );
}
