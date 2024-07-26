"use client";

import SelectWorkspaceCard from "./(components)/SelectWorkspaceCard";
import WorksapcesBar from "./(components)/WorkspacesBar";
import Loading from "./(components)/Loading";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Mainpage from "./(components)/(workspaces)/Mainpage";
import { useWorkspaceStore } from "./stores/workspaceBroswerData";
import ModWorkspace from "./(components)/(workspaces)/ModWorkspace";
import ItemWorkspaceMain from "./(components)/(workspaces)/ItemWorkspace/ItemWorkspaceMain";

const Page = () => {
  const [blocked, setBlocked] = useState(true);
  const { page } = useWorkspaceStore();

  const renderBlocked = () => {
    setTimeout(() => {
      setBlocked(false);
    }, 2000);
  };

  useEffect(() => {
    renderBlocked();
  });



  return (

    

    <div className="mt-[130px] mx-[15%] flex flex-col justify-center items-center">

      {blocked && <Loading />}
      {page == "mainpage" && <Mainpage/>}
      {page == "item" && <ItemWorkspaceMain/>}
      {page == "mod" && <ModWorkspace/>}
      
    </div>
  );
};

export default Page;
