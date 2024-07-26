import "../(components)/externalcss/loader.css";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const Loading = () => {
  return (
    <div
      key={1}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
    >
      <div id="loader"/> 
    </div>
  );
};

export default Loading;
