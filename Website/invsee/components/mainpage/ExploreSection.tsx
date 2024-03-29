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
      className="flex flex-col sm:p-10 items-center justify-center w-full h-[600px] sm:text-md relative z-3"
      id='explore_section'
    >
      <div className="flex flex-col items-center bg-black rounded-lg p-5 relative overflow-hidden">
        
        <h1 className="text-4xl text-white font-[700] max-w-[700px] text-center mt-10 tracking-wider">
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