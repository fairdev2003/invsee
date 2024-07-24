"use client";

import PickaxeIcon from "./(images)/itemIcon.svg";
import FireIcon from "./(images)/modIcon.svg";
import CraftingIcon from "./(images)/craftingIcon.svg";
import UserIcon from "./(images)/userIcon.svg";
import SelectWorkspaceCard from "./(components)/SelectWorkspaceCard";
import { useState } from "react";

const Page = () => {
  const [isSelected, selected] = useState<boolean>(false);

  return (
    <div className="mt-[130px] flex flex-col justify-center items-center px-5">
      <div>
        <h1 className="text-3xl font-bold text-white flex justify-center">
          What would you like to do today?
        </h1>
      </div>

      <div className="flex flex-wrap flex-3 justify-center gap-5 mt-10 p-7 rounded-xl border-[1px] border-gray-500">
        <SelectWorkspaceCard name="Create a mod" image={FireIcon} />
        <SelectWorkspaceCard name="Create an item" image={PickaxeIcon} />
        <SelectWorkspaceCard name="Create a crafting" image={CraftingIcon} />
        <SelectWorkspaceCard name="Add new user" image={UserIcon} />
      </div>
    </div>
  );
};

export default Page;
