import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";




const UsersSnippet = () => {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 100}} className="bg-gray-800 cursor-pointer text-white p-5 w-[600px] h-[300px] rounded-xl">
        <div className="flex items-center gap-3">
            <FaUser size={20} />
            <h1 className="font-bold text-2xl">Users</h1>
        </div>
        
    </motion.div>
  );
};

export default UsersSnippet;
