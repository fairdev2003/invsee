import { useState } from "react";
import WorkspaceInput from "../../Input";
import { useWorkspaceStore } from "../../../stores/workspaceBroswerData";
import { Item } from "@radix-ui/react-select";
import ItemWorkspace1 from "./ItemWorkspace1";
import Loading from "../../Loading";
import ItemWorkspace2 from "./ItemWorkspace2";
import ItemWorkspace3 from "./ItemWorkspace3";
import { set } from "mongoose";
import { trpc } from "@/app/_trpc/client";
import { isError } from "@tanstack/react-query";
import Error from "../../Error";

const ItemWorkspace = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const fakeloadingtime = 1000;
  const items = trpc.items.checkifitemexists.useMutation();

  const {
    setItemWorkspaceState,
    itemWorksapce,
    setErrorExplaination,
    setErrorState,
  } = useWorkspaceStore();

  const uploadPhoto = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const setStep = (step: number) => {
    if (itemWorksapce.step === step) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setItemWorkspaceState("step", step);

    }, fakeloadingtime);
  };

  // q:how to set return type of the function?

  const serverAction = (item_tag: string): boolean => {
    items.mutate(item_tag);
    console.log(items.data?.item_tag === item_tag);
    return items.data?.item_tag === item_tag;
  };

  const step = itemWorksapce.step;

  return (
    <div className="justify-center w-full px-[5%]">
      {loading && <Loading />}
      {itemWorksapce.workspaceErorr.error && (
        <Error
          message={itemWorksapce.workspaceErorr.message}
          description={itemWorksapce.workspaceErorr.description}
        />
      )}
      <div>
        <h1 className="text-3xl text-white font-bold">
          Item Workspace{" "}
          <span className="text-gray-500 text-base">
            Ediitng: {itemWorksapce.workspaceName}
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-10">
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
          1. Basic Info
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
          2. Wiki Elements
        </div>
        <div
          className={`${
            itemWorksapce.step === 3
              ? "text-white bg-blue-600"
              : `${
                  step === 1 || step === 2
                    ? "text-gray-400 bg-gray-500"
                    : "text-black bg-white"
                }`
          } h-[50px] w-full px-3 flex items-center rounded-lg cursor-pointer font-semibold`}
        >
          3. Media
        </div>
      </div>

      {itemWorksapce.step === 1 && <ItemWorkspace1 />}
      {itemWorksapce.step === 2 && <ItemWorkspace2 />}
      {itemWorksapce.step === 3 && <ItemWorkspace3 />}

      <div
        className={`flex ${
          itemWorksapce.step > 1 ? "justify-between" : "justify-end"
        } mt-10`}
      >
        {itemWorksapce.step > 1 && (
          <button
            onClick={() => {
              if (itemWorksapce.step === 1) return;
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setItemWorkspaceState("step", itemWorksapce.step - 1);
              }, 1500);
            }}
            className="bg-transparent rounded-xl p-4 w-[150px] transition-colors h-[70px] text-white font-medium text-lg"
          >
            {"< Previous"}
          </button>
        )}
        <button
          onClick={() => {
            if (itemWorksapce.step === 3) return;
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              if (serverAction(itemWorksapce.itemTag)) {
                setErrorState(true);
                setErrorExplaination(
                  "Item tag already exists",
                  "Please change the item tag"
                );
                return;
              }
              setItemWorkspaceState("step", itemWorksapce.step + 1);
            }, 1500);
          }}
          className="bg-blue-600 rounded-xl p-4 w-[250px] hover:bg-white hover:text-black transition-colors h-[70px] text-white font-medium text-lg"
        >
          {itemWorksapce.step === 3 ? "Save" : "Next >"}
        </button>
      </div>
    </div>
  );
};

export default ItemWorkspace;