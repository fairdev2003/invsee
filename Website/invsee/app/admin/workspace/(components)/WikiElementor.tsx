import type { WikiElement } from "@/stores/types/workspaceTypes";
import { useWorkspaceStore } from "../stores/workspaceBroswerData";
import { useState } from "react";
import "././externalcss/wikiElementor.css";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Edit, Trash, Trash2 } from "lucide-react";
import { WikiContentHandler } from "../utils/WikiContentHandler";

interface WikiElementorProps {
  elements?: WikiElement[];
}

const WikiElementor = ({ elements }: WikiElementorProps) => {
  const { setItemWorkspaceState, addNewWikiElement, itemWorksapce } =
    useWorkspaceStore();

  const addNewElement = () => {
    const randomWords = [
      "Marek",
      "Janusz",
      "Jakub",
      "Kasabian",
      "Janek",
      "Anna",
    ];

    addNewWikiElement({
      content:
        "Witam " + randomWords[Math.floor(Math.random() * randomWords.length)],
      image: "",
      title: "Title " + (itemWorksapce.wikiElements.length + 1),
      links: [],
      id: itemWorksapce.wikiElements.length + 1,
    });
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-col gap-y-10">
        <AnimatePresence>
          {itemWorksapce.wikiElements?.map((element, index) => (
            <WikiElement
              id={element.id}
              key={index}
              image={element.image}
              title={element.title}
              content={element.content}
            />
          ))}
        </AnimatePresence>
      </div>

      <button
        className="w-full h-[50px] mt-10 font-semibold bg-gray-600 rounded-lg text-white"
        onClick={addNewElement}
      >
        +
      </button>
    </div>
  );
};

interface WikiElementProps {
  id: number;
  content: string;
  image?: string;
  title?: string;
}

const WikiElement = ({ content, image, title = "", id }: WikiElementProps) => {
  const { deleteWikiElement, editWikiElement } = useWorkspaceStore();
  const [ editmode, setEditMode ] = useState(false);

  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key={id}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-col text-white h-auto w-full rounded-xl border-[2px] border-gray-200 p-5"
    >
      <div>
        <div className="flex justify-between items-center mb-5">
          {!editmode ? (
            <WikiContentHandler content={title} className="text-2xl font-semibold"/>
          ) : (
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={`${editmode}`}
              type="text"
              className="w-full h-[50px] bg-transparent border-[2px] border-gray-white rounded-lg mb-0 p-3 mr-5"
              value={titleValue}
              onChange={(e) => {
                setTitleValue(e.target.value);
              }}
            />
          )}
          <div className="flex gap-5">
            {!editmode ? <Edit
              size={20}
              className="cursor-pointer"
              onClick={() => {
                setTitleValue(title);
                setContentValue(content);
                setEditMode(true);
              }}
            /> : <Check
            size={25}
            className="cursor-pointer"
            onClick={() => {
              editWikiElement(id, {title: titleValue, content: contentValue, image: "", links: [], id: id});
              setEditMode(false);
            }}
          />}
            <Trash2
              size={20}
              className="cursor-pointer"
              onClick={() => {
                deleteWikiElement(id);
              }}
            />
          </div>
        </div>

        {!editmode ? (
          <WikiContentHandler content={content} />
        ) : (
          <motion.textarea
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={`${editmode}`}
            className="w-full h-[200px] bg-transparent border-[2px] border-gray-white rounded-lg p-3 mt-5"
            value={contentValue}
            onChange={(e) => {
                setContentValue(e.target.value);
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default WikiElementor;
