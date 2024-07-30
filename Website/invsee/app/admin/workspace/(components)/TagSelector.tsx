import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";
import { useWorkspaceStore } from "../stores/workspaceBroswerData";
import { useState } from "react";
import { Check, XIcon } from "lucide-react";
import "@/components/Navbar/components/externalcss/scrollbar.css";

const TagSelector = () => {
  const { language } = usePersistStore();
  const { itemWorkspace, setItemWorkspaceState } = useWorkspaceStore();

  const [editmode, setEditMode] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("");

  return (
    <div className="">
      <p className="text-white text-sm font-semibold">
        {translations[language]["Workspace"]["ItemWorkspace"]["Item Tags"]}
      </p>
    <div className="p-4 flex gap-2 bg-gray-800 rounded-lg outline-none overflow-x-scroll mt-3" id='modal'>
        {!editmode ? (
          <div
            onClick={() => {
              setEditMode(true);
            }}
            className="p-2 bg-gray-900 rounded-lg text-sm font-semibold hover:bg-white hover:text-black cursor-pointer text-blue-500"
          >
            <p>Add Tag</p>
          </div>
        ) : (
          <div className="p-2 bg-gray-900 rounded-lg text-sm font-semibold cursor-pointer text-white flex gap-1 items-center">
            <input onChange={(e) => {
                setTag(e.target.value);
            }} type="text" className="bg-gray-900 min-w-[50px] text-white bg-transparent outline-none" />
            <Check
              size={24}
              className="cursor-pointer"
              onClick={() => {
                setEditMode(false);
                setItemWorkspaceState("itemTags", [
                  ...itemWorkspace.itemTags,
                  { tagName: tag, id: Math.random() },
                ]);
              }}
            />
            <XIcon
              size={24}
              className="cursor-pointer"
              onClick={() => {
                setEditMode(false);
              }}
            />
          </div>
        )}
        {itemWorkspace.itemTags && itemWorkspace.itemTags.length > 0
          ? itemWorkspace.itemTags.map((tag, index) => (
              <div
                key={index}
                onClick={() => {
                    setItemWorkspaceState("itemTags", [
                        ...itemWorkspace.itemTags.filter(
                        (itemTag) => itemTag.id !== tag.id
                        ),
                    ]);
                }}
                className="p-2 bg-gray-900 flex items-center rounded-lg text-sm font-semibold hover:bg-white hover:text-black cursor-pointer text-blue-500"
              >
                #{tag.tagName}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default TagSelector;
