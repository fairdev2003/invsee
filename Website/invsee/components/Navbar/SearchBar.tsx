import { useTimeout } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { RiAppsLine } from "react-icons/ri";
import { trpc } from "@/app/_trpc/client";
import Image from "next/image";
import "../../app/admin/workspace/(components)/externalcss/loader.css";
import SearchResults from "./components/SearchResults";
import { useWorkspaceStore } from "@/app/admin/workspace/stores/workspaceBroswerData";
import { usePersistStore } from "@/stores/persist_store";

const SearchBar = () => {
  const [searching, setSearching] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [fallstart, setFallstart] = useState<boolean>(true);
  const [searchData, setSearchData] = useState<any>(null);
  const { itemWorkspace } = useWorkspaceStore();
  const { searchlocked } = usePersistStore();
  var startTime: Date = new Date();
  var endTime: Date = new Date();

  const [timespent, setTimespent] = useState<any>(null);

  const data = trpc.search.searchEverything.useMutation({
    onSettled: (data) => {
      setSearchData({ data: { ...data } });

      endTime = new Date();
      setTimespent(endTime.getTime() - startTime.getTime());
      console.log(timespent);
    },
  });
  useEffect(() => {
    data.mutate("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        document.body.style.overflow = "";
        setSearching(false);
      }
      if (e.key === "k" && e.ctrlKey && !searchlocked) {
        e.preventDefault();
        document.body.style.overflow = "hidden";
        setSearching(true);
        setFallstart(false);
        setTimeout(() => {
          searchRef.current?.focus();
        }, 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const search = (input: string) => {
    setFallstart(true);
    data.mutate(input);
  };

  return (
    <div>
      <AnimatePresence>
        {searching && !searchlocked ? (
          <motion.div className="fixed inset-0 flex justify-center bg-black pt-[100px] bg-opacity-75 z-50">
            <motion.div
              initial={{ opacity: 0, height: 300 }}
              animate={{ opacity: 1, height: 600 }}
              exit={{ opacity: 0, height: 300 }}
              className="text-gray-400 bg-gray-800 h-[600px] w-[800px] rounded-lg flex flex-col"
            >
              <div className="flex gap-1 items-center px-4 pt-2 justify-between">
                <div className="flex gap-1 items-center justify-center">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                  <input
                    spellCheck={false}
                    onChange={(e) => {
                      if (e.currentTarget.value.length > 0) {
                        startTime = new Date();
                        search(e.currentTarget.value);
                      } else {
                        setSearchData({ data: { ...data } });
                      }
                    }}
                    ref={searchRef}
                    placeholder="Search Mods..."
                    type="text"
                    className="w-full text-gray-400 font-semibold h-[50px] bg-transparent outline-none rounded-lg p-3"
                  />
                </div>
                <code
                  className="p-1 px-3 bg-gray-900 rounded-xl cursor-pointer"
                  onClick={() => {
                    document.body.style.overflow = "";
                    setSearching(false);
                    setFallstart(true);
                    setTimeout(() => {
                      searchRef.current?.focus();
                    }, 0);
                  }}
                >
                  ESC
                </code>
              </div>
              <div className="h-[2px] w-full bg-gray-600 mt-2 mb-3" />
              {!data.isLoading ? (
                <SearchResults
                  data={{
                    ...searchData,
                    workspaces: [
                      { workspaceName: itemWorkspace.workspaceName },
                    ],
                  }}
                />
              ) : (
                <div className="flex justify-center items-center h-full w-full">
                  <div className="loader"></div>
                </div>
              )}
              <div className="h-[2px] w-full bg-gray-600 flex justify-end items-center"></div>
              <div className="h-20 w-full flex justify-between items-center p-2 px-4">
                <p className="font-semibold">Elapsed in: {timespent}</p>
                <p>
                  <span className="text-gray-400">Powered by</span>
                  <span className="text-blue-500 font-semibold">
                    {" "}
                    Modopedia
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button
        className="flex gap-7 items-center p-3 px-3 bg-gray-800 hover:bg-gray-600 cursor-pointer rounded-lg select-none"
        onClick={() => {
          if (searchlocked) {
            return;
          }
          document.body.style.overflow = "hidden";
          setSearching(true);
          setFallstart(false);
          setTimeout(() => {
            searchRef.current?.focus();
          }, 0);
        }}
      >
        <div className="w-full h-full text-sm font-semibold flex gap-2 items-center justify-center rounded-lg">
          <SearchIcon className="h-5 w-5 text-gray-400" />
          <p className="text-gray-400">Search Mods...</p>
        </div>
        <code className="text-gray-400 flex items-center gap-1 text-sm p-1 px-3 bg-gray-900 rounded-xl">
          CTRL<span>+</span>K
        </code>
      </button>
    </div>
  );
};

export default SearchBar;
