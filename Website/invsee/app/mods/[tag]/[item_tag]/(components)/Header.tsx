import { ItemSlot } from "@/components/Item/ItemStack";
import Image from "next/image";

interface WikiHeaderProps {
  func: any;
  mod: any;
  tag: string;
}

const WikiHeader = ({ func, mod, tag }: WikiHeaderProps) => {
  return (
    <div className="col-span-3 rounded-xl grid grid-rows-4 grid-cols-1 gap-y-4">
      <div className="bg-[#1C1A1A] flex row-span-1 w-full rounded-3xl">
        {!mod.isLoading
          ? func()
              .data?.slice(0, 1)
              .map((item: any) => {
                return (
                  <div className="text-white px-5 flex gap-5 items-center">
                    <Image
                      alt={item.id}
                      width={150}
                      height={150}
                      src={`https://res.cloudinary.com/dzaslaxhw/image/upload/v1709745445/${tag}/${item.item_tag}.png`}
                    ></Image>
                    <div className="flex flex-col justify-start items-start gap-2">
                      <h1 className="font-[700] text-3xl">{item.item_name}</h1>
                      <p className="font-[500] text-md italic text-[#AAA3A3] w-[30%]">
                        {`"${
                          item.short_description.length < 130
                            ? item.short_description
                            : item.short_description.slice(0, 110) + "..."
                        }"`}
                      </p>
                    </div>
                  </div>
                );
              })
          : "loading"}
      </div>
      <div className="bg-[#1C1A1A] row-span-3 rounded-3xl flex flex-col p-5 gap-2">
        <div className="flex gap-2">
          <ItemSlot size={50} itemTag="ae2__controller" itemName="ME Controller" mod="ae2"/>
          <ItemSlot size={50}itemTag="ae2__chest" itemName="ME Chest" mod="ae2"/>
          <ItemSlot size={50} itemTag="ae2__charger" itemName="Charger" mod="ae2"/>
        </div>
        <div className="flex gap-2">
          <ItemSlot/>
          <ItemSlot itemTag="ae2__charger" itemName="Charger" mod="ae2"/>
          <ItemSlot itemTag="ae2__chest" itemName="ME Chest" mod="ae2"/>
        </div>
        <div className="flex gap-2">
          <ItemSlot itemTag="ae2__controller" itemName="ME Controller" mod="ae2"/>
          <ItemSlot itemTag="ae2__chest" itemName="ME Chest" mod="ae2"/>
          <ItemSlot itemTag="ae2__charger" itemName="Charger" mod="ae2"/>
        </div>
      </div>
    </div>
  );
};

export default WikiHeader;
