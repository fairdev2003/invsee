import { useState } from "react";
import ItemWorkspace1 from "./ItemWorkspace1";
import Loading from "../../Loading";
import ItemWorkspace2 from "./ItemWorkspace2";
import ItemWorkspace3 from "./ItemWorkspace3";
import { trpc } from "@/app/_trpc/client";
import Error from "../../Error";
import { motion } from "framer-motion";
import { translations } from "@/utils/translations";
import { usePersistStore } from "@/stores/persist_store";
import { useWorkspaceStore } from "../../../stores/workspaceBroswerData";

const ItemWorkspace = () => {
  const { language } = usePersistStore();
  const {
    setItemWorkspaceState,
    itemWorkspace,
    setErrorExplaination,
    setErrorState,
  } = useWorkspaceStore();
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const fakeloadingtime = 1000;
  const items = trpc.items.checkifitemexists.useMutation();

  const saveaction = trpc.items.saveItem.useMutation();

  const saveItemWorksapceIntoDatabase = () => {
    // Save the item workspace into
    // the
    // database
    const tags: string[] = [];
    itemWorkspace.itemTags.map((tag) => {
      tags.push(tag.tagName);
    });

    const {
      itemTag,
      itemName,
      itemDescription,
      mod,
      stackSize,
      itemType,
      materialValue,
      itemTags,
    } = itemWorkspace;

    saveaction.mutate({
      item_tag: itemTag,
      item_name: itemName,
      short_description: itemDescription,
      modId: mod.id,
      stack_size: parseInt(stackSize),
      type: itemType,
      material_value: parseInt(materialValue),
      tags: itemTags,
    });
  };

  const setStep = (step: number) => {
    if (itemWorkspace.step === step) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setItemWorkspaceState("step", step);
    }, fakeloadingtime);
  };

  const serverAction = (item_tag: string): boolean => {
    items.mutate(item_tag);
    console.log(items.data?.item_tag === item_tag);
    return items.data?.item_tag === item_tag;
  };

  const step = itemWorkspace.step;

  return (
    <div className="justify-center w-full px-[5%] mb-20 mt-5">
      {loading && <Loading />}
      {itemWorkspace.workspaceErorr.error && (
        <Error
          message={itemWorkspace.workspaceErorr.message}
          description={itemWorkspace.workspaceErorr.description}
        />
      )}
      <div>
        <h1 className="text-3xl text-white font-bold">
          {
            translations[language]["Workspace"]["ItemWorkspace"][
              "Item Workspace"
            ]
          }{" "}
          <span className="ml-1 text-gray-500 text-base">
            {translations[language]["Workspace"]["Editing"]}:{" "}
            {itemWorkspace.workspaceName}
          </span>
        </h1>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 50 }}
        className="grid grid-cols-3 gap-5 mt-10"
      >
        <div
          className={`${
            step === 1 ? "text-white bg-blue-600" : "text-black bg-white"
          } h-[50px] w-full px-3 flex items-center rounded-lg cursor-pointer font-semibold`}
          onClick={() => {
            if (step === 2 || step === 3) {
              setStep(1);
            }
          }}
        >
          1.{" "}
          {translations[language]["Workspace"]["ItemWorkspace"]["Basic Info"]}
        </div>
        <div
          className={`${
            step === 2
              ? "text-white bg-blue-600"
              : `${
                  step === 1
                    ? "text-gray-400 bg-gray-500"
                    : "text-black bg-white"
                }`
          } h-[50px] w-full px-3 flex items-center rounded-lg cursor-pointer font-semibold`}
          onClick={() => {
            if (step === 3) {
              setStep(2);
            }
          }}
        >
          2.{" "}
          {
            translations[language]["Workspace"]["ItemWorkspace"][
              "Wiki Elementor"
            ]
          }
        </div>
        <div
          className={`${
            itemWorkspace.step === 3
              ? "text-white bg-blue-600"
              : `${
                  step === 1 || step === 2
                    ? "text-gray-400 bg-gray-500"
                    : "text-black bg-white"
                }`
          } h-[50px] w-full px-3 flex items-center rounded-lg cursor-pointer font-semibold`}
        >
          3. {translations[language]["Workspace"]["ItemWorkspace"]["Media"]}
        </div>
      </motion.div>

      {itemWorkspace.step === 1 && <ItemWorkspace1 />}
      {itemWorkspace.step === 2 && <ItemWorkspace2 />}
      {itemWorkspace.step === 3 && <ItemWorkspace3 />}

      <div
        className={`flex ${
          itemWorkspace.step > 1 ? "justify-between" : "justify-end"
        } mt-10`}
      >
        {itemWorkspace.step > 1 && (
          <button
            onClick={() => {
              if (itemWorkspace.step === 1) return;
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setItemWorkspaceState("step", itemWorkspace.step - 1);
              }, 1500);
            }}
            className="bg-transparent rounded-xl p-4 w-[150px] transition-colors h-[70px] text-white font-medium text-lg"
          >
            {"<"} {translations[language]["Workspace"]["Previous"]}
          </button>
        )}
        <button
          onClick={() => {
            if (itemWorkspace.step === 3) {
              saveItemWorksapceIntoDatabase();
              return;
            }
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              if (serverAction(itemWorkspace.itemTag)) {
                setErrorState(true);
                setErrorExplaination(
                  "Item tag already exists",
                  "Please change the item tag"
                );
                return;
              }
              setItemWorkspaceState("step", itemWorkspace.step + 1);
            }, 1500);
          }}
          className="bg-blue-600 rounded-xl p-4 w-[250px] hover:bg-white hover:text-black transition-colors h-[70px] text-white font-medium text-lg"
        >
          {itemWorkspace.step === 3
            ? `${translations[language]["Workspace"]["Save"]}`
            : `${translations[language]["Workspace"]["Next"]}`}
        </button>
      </div>
    </div>
  );
};

export default ItemWorkspace;
