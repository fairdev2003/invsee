"use client";

import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";
import Meatball from "@/assets/meatball.svg";
import Image from "next/image";
import Art1 from "@/assets/art1.png";
import Art2 from "@/assets/art2.png";
import Art3 from "@/assets/art3.png";
import Art4 from "@/assets/art4.png";
import Art5 from "@/assets/art5.png";
import Art6 from "@/assets/art6.png";
import Art7 from "@/assets/art7.png";
import Art8 from "@/assets/art8.png";
import { GoDot, GoDotFill } from "react-icons/go";
import { FaPlay, FaPause } from "react-icons/fa";
import { url } from "inspector";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { set } from "mongoose";

const ExploreSection = () => {
  const { language } = usePersistStore();
  const [image, setImage] = useState(Art2.src);
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [paused, setPaused] = useState(false);

  const imageReference = translations[language]["Mainpage"]["ExploreSection"]["Images"]

  const images = [
    { image: Art1.src, name: imageReference[0] },
    { image: Art2.src, name: imageReference[1] },
    { image: Art3.src, name: imageReference[2] },
    { image: Art4.src, name: imageReference[3] },
    { image: Art5.src, name: imageReference[4] },
    { image: Art6.src, name: imageReference[5] },
    { image: Art7.src, name: imageReference[6] },
    { image: Art8.src, name: imageReference[7] },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (!paused) {
          const newIndex = (prevIndex + 1) % images.length;
          setImage(images[newIndex].image);
          return newIndex;
        }
        return index;
      });
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={image}
      className="flex flex-col sm:p-10 items-center relative justify-center w-full h-[600px] sm:text-md z-3"
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: "110px",
      }}
    >
      <motion.div initial={{ opacity: 0 }}animate={{ opacity: 1 }} key={`${hidden}`} className={`absolute ${hidden ? "hidden" : "flex"} flex-col items-center bg-black rounded-lg p-5`}>
        <h1 className="text-4xl text-white font-[700] max-w-[700px] text-center mt-10 tracking-wider">
          {
            translations[language]["Mainpage"]["ExploreSection"][
              "Explore you favorite"
            ]
          }{" "}
          <span className="p-1 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {translations[language]["Mainpage"]["ExploreSection"]["Mods"]}
          </span>
        </h1>
        <h1 className="text-4xl text-white font-[700] w-[700px] text-center mt-5 tracking-wider">
          {" "}
          {
            translations[language]["Mainpage"]["ExploreSection"][
              "and wiki about them!"
            ]
          }
        </h1>
        <Link
          href="/"
          className="text-white hover:underline hover:text-blue-300 my-5 hover:font-[700] flex gap-1"
        >
          {translations[language]["Mainpage"]["ExploreSection"]["Get Started"]}{" "}
          <ArrowRight />
        </Link>
      </motion.div>
      <div className="text-white flex gap-2 px-3 font-bold absolute bg-black bottom-10 right-10 p-2 select-none rounded-md">
        {images[index].name}
      </div>
      <div className="text-white font-bold absolute bg-black bottom-10 p-2 flex items-center rounded-md">
        
        {images.map((_, i) => {
          return i === index ? (
            <GoDotFill size={30} className="cursor-pointer" />
          ) : (
            <GoDot
              onClick={() => {
                setIndex(i);
                setImage(images[i].image);
              }}
              size={30}
              className="cursor-pointer"
            />
          );
        })}
      </div>

      <div className="text-white flex gap-2 font-bold absolute bottom-10 left-10">
        <div className="bg-black w-10 h-10 rounded-md select-none flex items-center justify-center cursor-pointer" onClick={() => {setPaused(!paused)}}>{paused ? <FaPlay/> : <FaPause/>}</div>
        <div className="bg-black w-10 h-10 rounded-md select-none flex items-center justify-center cursor-pointer" onClick={() => {setHidden(!hidden)}}>{!hidden ? <EyeOff/> : <Eye/>}</div>
      </div>
      
    </motion.div>
  );
};

export default ExploreSection;
