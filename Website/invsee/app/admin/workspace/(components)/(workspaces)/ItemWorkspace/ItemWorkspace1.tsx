import { useRef, useState } from "react";
import WorkspaceInput from "../../Input";
import { useWorkspaceStore } from "../../../stores/workspaceBroswerData";
import Image from "next/image";
import { motion } from "framer-motion";
import Loading from "../../Loading";
import "../../externalcss/dangerouslySetInnerHTML.css";
import { translations } from "@/utils/translations";
import { usePersistStore } from "@/stores/persist_store";
import ModSelector from "../../ModSelector";
import TagSelector from "../../TagSelector";

const ItemWorkspace1 = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const { language } = usePersistStore();
  const photoRef = useRef<HTMLImageElement>(null);

  const { setItemWorkspaceState, itemWorkspace } = useWorkspaceStore();
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
          {translations[language]["Workspace"]["ItemWorkspace"]["General Info"]}
        </h1>
      </div>

      <div className="mt-5">
        <div className="mt-5 rounded-md font-bold text-xl flex flex-col gap-5 text-white col-span-5 ">
          <div className="grid grid-cols-2 gap-4">
            <WorkspaceInput
              name={
                translations[language]["Workspace"]["ItemWorkspace"][
                  "Item Name"
                ]
              }
              placeholder={
                translations[language]["Workspace"]["ItemWorkspace"][
                  "Type Item Name"
                ]
              }
              value={itemWorkspace.itemName}
              required
              height="[70px]"
              onChange={(e) => {
                setItemWorkspaceState("itemName", e.target.value);
              }}
            />
            <WorkspaceInput
              name={
                translations[language]["Workspace"]["ItemWorkspace"]["Item Tag"]
              }
              placeholder={
                translations[language]["Workspace"]["ItemWorkspace"][
                  "Type Item Tag"
                ]
              }
              comment="(MOD__ITEM_NAME)"
              required
              height="[70px]"
              value={itemWorkspace.itemTag}
              onChange={(e) => {
                setItemWorkspaceState("itemTag", e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <WorkspaceInput
              className="col-span-1"
              name={
                translations[language]["Workspace"]["ItemWorkspace"][
                  "Material Value"
                ]
              }
              comment="(EMC)"
              placeholder={
                translations[language]["Workspace"]["ItemWorkspace"][
                  "Type Item Emc"
                ]
              }
              height="[70px]"
              value={itemWorkspace.materialValue}
              onChange={(e) => {
                setItemWorkspaceState("materialValue", e.target.value);
              }}
            />
            <WorkspaceInput
              placeholder={
                translations[language]["Workspace"]["ItemWorkspace"][
                  "Type Stack Size"
                ]
              }
              name={
                translations[language]["Workspace"]["ItemWorkspace"][
                  "Stack Size"
                ]
              }
              comment="(1-64)"
              required
              className="col-span-1"
              value={itemWorkspace.stackSize}
              onChange={(e) => {
                setItemWorkspaceState("stackSize", e.target.value);
              }}
              height="[70px]"
            />
            <WorkspaceInput
              className="col-span-2"
              name={
                translations[language]["Workspace"]["ItemWorkspace"][
                  "Item Type"
                ]
              }
              placeholder={
                translations[language]["Workspace"]["ItemWorkspace"][
                  "Type Item Type"
                ]
              }
              value={itemWorkspace.itemType}
              required
              height="[70px]"
              onChange={(e) => {
                setItemWorkspaceState("itemType", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <TagSelector/>
        <div className="grid grid-cols-2 mt-5 gap-4">
          <ModSelector
            onClick={() => {
              console.log("clicked!");
            }}
            name={
              translations[language]["Workspace"]["ItemWorkspace"]["Choose Mod"]
            }
          />

          <div>
            <p className="text-white text-sm font-semibold mb-2">
              {
                translations[language]["Workspace"]["ItemWorkspace"][
                  "Item Preview"
                ]
              }
            </p>
            <div className="h-[100px] flex gap-7 items-center p-1 px-3 bg-gray-800 hover:bg-gray-600 cursor-pointer rounded-lg outline-none focus:bg-gray-600">
              <motion.div
                key={itemWorkspace.mod && itemWorkspace.mod.id}
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className="flex gap-2"
              >
                <Image
                  ref={photoRef}
                  onError={(e) => {
                    // @ts-ignore
                    photoRef.current.src = "deafult.png";
                  }}
                  src={`https://res.cloudinary.com/dzaslaxhw/image/upload/v1709745445/${itemWorkspace.mod && itemWorkspace.mod.tag}/${itemWorkspace.itemTag}.png`}
                  width={60}
                  height={60}
                  alt="mod_icon"
                />
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p className="text-white font-semibold flex gap-1 items-center">
                      {itemWorkspace.itemName} {">"}
                      <span className="text-sm text-gray-400">
                        {itemWorkspace.itemType}
                      </span>
                    </p>
                    <p className="text-blue-500 font-medium">
                      {itemWorkspace.mod && itemWorkspace.mod.modName}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <WorkspaceInput
          name={
            translations[language]["Workspace"]["ItemWorkspace"][
              "Item Description"
            ]
          }
          placeholder={
            translations[language]["Workspace"]["ItemWorkspace"][
              "Type Item Description"
            ]
          }
          value={itemWorkspace.itemDescription}
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
