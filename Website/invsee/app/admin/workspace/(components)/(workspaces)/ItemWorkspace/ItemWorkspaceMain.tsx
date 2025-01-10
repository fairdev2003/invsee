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
  } = useWorkspaceStore();
    const [loading, setLoading] = useState<boolean>(false);

  const step = itemWorkspace.step;

  return (
    <div className="flex flex-col justify-center w-full lg:px-[5%] mt-5 mb-20">
      {loading && <Loading />}
      {itemWorkspace.workspaceErorr.error && (
        <Error
          message={itemWorkspace.workspaceErorr.message}
          description={itemWorkspace.workspaceErorr.description}
        />
      )}
      <div className="lg:flex lg:flex-row md:flex md:flex-row items-end">
        <h1 className="text-3xl flex flex-col gap-2 text-white font-bold">
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
        animate={{ height: "100%" }}
        className="lg:grid lg:grid-cols-3 flex-col flex w-auto gap-5 mt-10"
      >
        <div
          className={`${
            step === 1 ? "text-white bg-blue-600" : "text-black bg-white"
          } h-[50px] w-full px-3 flex items-center rounded-lg cursor-pointer font-semibold`}
          onClick={() => {
            if (step === 2 || step === 3) {

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

              return;
            }
            setLoading(true);
            setTimeout(() => {
              setLoading(false);

              setItemWorkspaceState("step", itemWorkspace.step + 1);
            }, 1500);
          }}
          className="bg-blue-600 mb-10 rounded-xl p-4 lg:w-[250px] md:w-[250px] w-full hover:bg-white hover:text-black transition-colors h-[70px] text-white font-medium text-lg"
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
