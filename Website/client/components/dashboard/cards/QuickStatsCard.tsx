import { trpc } from "@/app/_trpc/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Lock, RefreshCcw } from "lucide-react"

const QuickStatsCard = () => {
  const stats = trpc.getOverviewStats.useQuery();

  const handleRefresh = () => {
    stats.remove()
    stats.refetch()
}

  return (
    <Card className="border-[2px] border-gray-900/50 rounded-md text-white pt-5 w-[500px] h-[270px]">
      <CardContent className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between">
            <CardTitle className="ml-0">Quick Stats</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <RefreshCcw
                    className={`w-5 h-5 cursor-pointer  transition-colors hover:text-blue-500 ${
                      stats.isLoading
                        ? "animate-spin duration-1000 text-blue-500"
                        : "text-white"
                    }`}
                    onClick={() => {
                      handleRefresh();
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription className="ml-0">
            Quick overview what have we got already!
          </CardDescription>
        </div>
        <div className="bg-gray-900/50 rounded-full mt-2">
          <div className="flex justify-between items-center p-2 px-4">
            <p className="text-[15px]">Users</p>
            {!stats.isLoading ? (
              <p className="text-[15px]">{stats.data?.users}</p>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
        <div className="bg-gray-900/50 rounded-full mt-2">
          <div className="flex justify-between items-center p-2 px-4">
            <p className="text-[15px]">Logs</p>
            {!stats.isLoading ? (
              <p className="text-[15px]">{stats.data?.logs}</p>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
        <div className="bg-gray-900/50 rounded-full mt-2">
          <div className="flex justify-between items-center p-2 px-4">
            <p className="text-[15px]">Items</p>
            {!stats.isLoading ? (
              <p className="text-[15px]">{stats.data?.items}</p>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStatsCard;
