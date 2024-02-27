import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
  } from "@/components/ui/card";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUserStore } from "@/stores/user_store";

const roles_with_access = ["Admin"];

const StatsCard = () => {

    const { account_data }: any = useUserStore(); 

    return (
        <Card className="border-[2px] border-gray-900/50 rounded-md text-white pt-5 w-[870px] h-[270px]">
            <CardContent className="flex flex-col gap-y-2">
                <CardTitle className="ml-0">Dashboard Stats</CardTitle>
                <CardDescription className="ml-0">Super Duper charts for dashboard stats</CardDescription>
                <div className="flex justify-center items-center h-[150px]">
                    <p className="font-[600] text-xl">Soon</p>
                </div>
            </CardContent>
        </Card> 
    )
}

export default StatsCard;