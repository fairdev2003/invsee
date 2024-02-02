import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SliderProps {
  item_tag: string;
}

const SliderMenu = ({ item_tag }: SliderProps) => {
  const searchParams: any = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [section, setsection] = useState("");

  useEffect(() => {
    if (searchParams.has("section")) {
      setsection(searchParams.get("section"));
    } else {
      setsection("overview");
    }
  }, [searchParams]);

  return (
    <menu className="flex gap-5 bg-[#2e3238] p-5 px-10 rounded-lg">
      <p
        className=" text-white flex flex-col justify-center gap-[0.5px] font-[500] select-none"
        onClick={() => {
          router.push(`/wiki/item/${item_tag}/?&section=overview`);
        }}
      >
        <p className="active:scale-90 cursor-pointer">Overview</p>
        {section === "overview" ? (
          <div className="w-full h-[5px] rounded-full bg-blue-500"></div>
        ) : (
          <div className="w-full h-[5px]"></div>
        )}
      </p>
      <p
        className=" text-white flex flex-col justify-center gap-[0.5px] font-[500] select-none"
        onClick={() => {
          router.push(`/wiki/item/${item_tag}/?&section=crafting`);
        }}
      >
        <p className="active:scale-90 cursor-pointer">Crafting</p>
        {section === "crafting" ? (
          <div className="w-full h-[5px] rounded-full bg-blue-500"></div>
        ) : (
          <div className="w-full h-[5px]"></div>
        )}
      </p>
      <p
        className=" text-white flex flex-col justify-center gap-[1px] font-[500] select-none"
        onClick={() => {
          router.push(`/wiki/item/${item_tag}/?&section=guides`);
        }}
      >
        <p className="active:scale-90 cursor-pointer">Guides</p>
        {section === "guides" ? (
          <div className="w-full h-[5px] rounded-full bg-blue-500"></div>
        ) : (
          <div className="w-full h-[5px]"></div>
        )}
      </p>
      <p
        className=" text-white flex flex-col justify-center gap-[0.5px] font-[500] select-none"
        onClick={() => {
          router.push(`/wiki/item/${item_tag}/?&section=links`);
        }}
      >
        <p className="active:scale-90 cursor-pointer">Links</p>
        {section === "links" ? (
          <div className="w-full h-[5px] rounded-full bg-blue-500"></div>
        ) : (
          <div className="w-full h-[5px]"></div>
        )}
      </p>
      <p
        className=" text-white flex flex-col justify-center gap-[0.5px] font-[500] select-none"
        onClick={() => {
          router.push(`/wiki/item/${item_tag}/?&section=upgrades`);
        }}
      >
        <p className="active:scale-90 cursor-pointer">Upgrades</p>
        {section === "upgrades" ? (
          <div className="w-full h-[5px] rounded-full bg-blue-500"></div>
        ) : (
          <div className="w-full h-[5px]"></div>
        )}
      </p>
      <p
        className=" text-white flex flex-col justify-center gap-[0.5px] font-[500] select-none"
        onClick={() => {
          router.push(`/wiki/item/${item_tag}/?&section=mana_mechanic`);
        }}
      >
        <p className="active:scale-90 cursor-pointer">Mana Mechanic</p>
        {section === "mana_mechanic" ? (
          <div className="w-full h-[5px] rounded-full bg-blue-500"></div>
        ) : (
          <div className="w-full h-[5px]"></div>
        )}
      </p>
    </menu>
  );
};

export default SliderMenu;
