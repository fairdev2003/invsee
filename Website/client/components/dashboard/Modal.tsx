"use client";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent } from "../ui/dialog";
import { Plus, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRef, useState } from "react";

interface AddItemModalProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export const AddItemModal = ({
  children,
  className,
  color,
}: AddItemModalProps) => {
  const [itemName, setItemName] = useState<string>("");
  const [modTag, setModTag] = useState<string>("");

  const [itemNameRef, ModTagRef, descriptionRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLTextAreaElement>(null),
  ];

  return (
    <Dialog>
      <DialogTrigger>
        <button className="bg-green-500 rounded-lg p-2 pr-3 flex gap-1 font-[500] text-white outline-red-500">
          <Plus />
          Add New Item
        </button>
      </DialogTrigger>

      <DialogContent className={cn("", className)}>
        <div className="flex justify-start gap-x-3 items-center">
          <Image
            width={40}
            height={40}
            alt="deafult"
            src={`/mc_assets/${
              modTag.replace(":", "__").split("__")[0]
            }/${modTag}.png`}
            onError={(e) => {
              e.currentTarget.src = `/mc_assets/ae2/ae2__controller.png`;
            }}
          ></Image>
          <p className="text-white font-medium">Add New Item!</p>
        </div>
        <div className="flex flex-col gap-5 items-center mb-5">
          <div className="flex gap-x-4 items-center justify-center">
            <p className="text-white font-medium flex justify-center w-[100px]">
              Item Name
            </p>
            <div className="flex gap-3 items-center h-7 rounded-md bg-[#32343a] py-6 px-3 text-white font-[500] w-[300px]">
              <input
                ref={itemNameRef}
                className="bg-transparent outline-none w-full"
                type="text"
                onChange={(e) => setItemName(e.target.value)}
                placeholder={"Your Item Name"}
              ></input>
            </div>
          </div>

          <div className="flex gap-x-4 items-center justify-center">
            <p className="text-white font-medium flex justify-center w-[100px]">
              Mod Tag
            </p>
            <div className="flex gap-3 items-center h-7 rounded-md bg-[#32343a] py-6 px-3 text-white font-[500] w-[300px]">
              <input
                ref={ModTagRef}
                onChange={(e) => setModTag(e.target.value)}
                className="bg-transparent outline-none w-full"
                type="text"
                placeholder={"Your Item Name"}
              ></input>
            </div>
          </div>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
