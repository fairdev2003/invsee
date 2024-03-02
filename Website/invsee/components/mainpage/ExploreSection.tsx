'use client'

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";
import Meatball from "@/assets/meatball.svg";
import Image from "next/image";

const ExploreSection = () => {

  const { language } = usePersistStore();
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-[600px] relative"
      
    >
      <div className="flex flex-col items-center bg-black rounded-lg p-5 relative">
        <Image alt={"SVG"} className="absolute -top-[200px] -left-[500px]" height={200} width={200} src={Meatball}></Image>
        <Image alt={"SVG"} className="absolute top-[100px] left-[800px]" height={200} width={200} src={Meatball}></Image>
        <Image alt={"SVG"} className="absolute -top-[250px] left-[1000px]" height={200} width={200} src={Meatball}></Image>
        <Image alt={"SVG"} className="absolute top-[450px] left-[1000px]" height={200} width={200} src={Meatball}></Image>
        <Image alt={"SVG"} className="absolute top-[600px] -left-[500px]" height={200} width={200} src={Meatball}></Image>
        <Image alt={"SVG"} className="absolute top-[160px] -left-[50px]" height={200} width={200} src={Meatball}></Image>
        <h1 className="text-4xl text-white font-[700] w-[700px] text-center mt-10 tracking-wider">
        {translations[language]["Mainpage"]["ExploreSection"]["Explore you favorite"]}{" "}
          <span className="p-1 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {translations[language]["Mainpage"]["ExploreSection"]["Mods"]}
          </span>
        </h1>
        <h1 className="text-4xl text-white font-[700] w-[700px] text-center mt-5 tracking-wider">
          {" "}
          {translations[language]["Mainpage"]["ExploreSection"]["and wiki about them!"]}
        </h1>
        <Link
          href="/"
          className="text-white hover:underline hover:text-blue-300 my-5 hover:font-[700] flex gap-1"
        >
          {translations[language]["Mainpage"]["ExploreSection"]["Get Started"]} <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default ExploreSection;