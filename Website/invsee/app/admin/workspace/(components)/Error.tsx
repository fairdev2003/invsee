import "../(components)/externalcss/loader.css";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useWorkspaceStore } from "../stores/workspaceBroswerData";

interface ErrorProps {
  message: string;
  description: string;
}

const Error = ({ message, description }: ErrorProps) => {
  const { setErrorState } = useWorkspaceStore();

  return (
    <div
      key={1}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
    >
      <motion.div initial={{scale: 0}} animate={{scale: 1}} className="text-black bg-white p-10 rounded-lg flex flex-col justify-center">
        <div className="flex justify-center flex-col">
            <h1 className="text-2xl font-semibold">{message}</h1>
            <p className="text-md text-center font-normal">{description}</p>
        </div>

        <button onClick={() => {
            setErrorState(false);
        }} className="bg-blue-600 text-white hover:text-white transition-colors hover:bg-black mt-3 h-[50px] rounded-xl">
          Understand
        </button>
      </motion.div>
    </div>
  );
};

export default Error;
