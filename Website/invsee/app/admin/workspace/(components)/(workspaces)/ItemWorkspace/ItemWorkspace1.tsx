import { useState } from "react";
import WorkspaceInput from "../../Input";
import { useWorkspaceStore } from "../../../stores/workspaceBroswerData";
import Image from "next/image";
import { motion } from "framer-motion";
import Loading from "../../Loading";

const ItemWorkspace1 = () => {
  const [photo, setPhoto] = useState<string | null>(null);

  const { setItemWorkspaceState, itemWorksapce } = useWorkspaceStore();
  const [loading, setLoading] = useState<boolean>(false);

  const uploadPhoto = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setItemWorkspaceState("itemImage", reader.result as string);
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {loading && <Loading />}
      <div className="mt-10 flex flex-col justify-center">
        <h1 className="text-3xl text-white font-bold border-[2px] border-transparent border-b-gray-200 pb-5">
          General Info
        </h1>
      </div>

      <div className="grid grid-cols-5 gap-5 place-content-center">
        <div className="h-[200px] cursor-pointer w-[200px] bg-white mt-10 rounded-md flex justify-center font-bold text-xl items-center col-span-1">
          {itemWorksapce.itemImage.length < 50 ? (
            <input
              type="file"
              accept="image/*"
              placeholder="Upload Image"
              onChange={uploadPhoto}
              className="opacity-0 cursor-pointer w-full h-full"
            />
          ) : (
            <Image
              onClick={() => {
                setItemWorkspaceState("itemImage", "");
              }}
              alt="image"
              width={180}
              height={180}
              src={itemWorksapce.itemImage}
            />
          )}
        </div>

        <div className="h-[200px] mt-10 rounded-md font-bold text-xl flex flex-col gap-4 text-white col-span-4 ">
          <div className="grid grid-cols-2 gap-2">
            <WorkspaceInput
              name="Item Name"
              placeholder="Type item name"
              value={itemWorksapce.itemName}
              required
              onChange={(e) => {
                setItemWorkspaceState("itemName", e.target.value);
              }}
            />
            <WorkspaceInput
              name="Item Tag"
              placeholder="Type item tag"
              comment="(MOD__ITEM_NAME)"
              required
              value={itemWorksapce.itemTag}
              onChange={(e) => {
                setItemWorkspaceState("itemTag", e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <WorkspaceInput
              name="Material Value"
              comment="(EMC)"
              placeholder="Type item name"
              value={itemWorksapce.materialValue}
              onChange={(e) => {
                setItemWorkspaceState("materialValue", e.target.value);
              }}
            />
            <WorkspaceInput
              name="Mod Tag"
              placeholder="Type item tag"
              value={itemWorksapce.modTag}
              onChange={(e) => {
                setItemWorkspaceState("modTag", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <WorkspaceInput
          name="Item Description"
          placeholder="Type item description"
          value={itemWorksapce.itemDescription}
          textarea
          height="[100px]"
          width="full"
          onChange={(e) => {
            setItemWorkspaceState("itemDescription", e.target.value);
          }}
        />
      </div>
      
    </motion.div>
  );
};

export default ItemWorkspace1;
