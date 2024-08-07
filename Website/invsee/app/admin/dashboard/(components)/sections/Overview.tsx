import { useUserStore } from "@/stores/user_store";
import { motion } from "framer-motion";
import UsersSnippet from "../OverviewComponents/UsersSnippet";

const Overview = () => {
    const { account_data } = useUserStore();
    console.log("Account Data", account_data);

  return (
    <div>
        {account_data[0] && account_data.length > 0 ? <motion.h1 initial={{x: -20}} animate={{x: 0}} className="text-xl text-white font-bold">Hello {account_data[0].nick} 👋</motion.h1> : null}
        <div className="mt-10">
            <UsersSnippet />
        </div>
    </div>
  );
};

export default Overview;
