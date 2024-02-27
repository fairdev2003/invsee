import { trpc } from "@/app/_trpc/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { set } from "mongoose";

const LogCard = () => {


  const logs = trpc.log.getAllLogs.useQuery();

  const handleRefresh = () => {
    logs.refetch()
}

  return (
    <Card className="border-[2px] border-gray-900/50 rounded-md text-white pt-5 w-[870px] mt-5">
      <CardContent>
        <div className="flex justify-between">
          <CardTitle>User Logs</CardTitle>
          <RefreshCcw className={`w-5 h-5 cursor-pointer  transition-colors hover:text-blue-500 ${logs.isLoading ? "animate-spin duration-1000 text-blue-500" : "text-white"}`} onClick={() => {handleRefresh()}}/>
        </div>

        <CardDescription className="mt-1">
          What actions user performed on the dashboard
        </CardDescription>
        <div className="flex flex-col gap-y-4 mt-4 mb-4">
            {!logs.isLoading ? logs.data?.slice(logs.data?.length - 4, logs.data?.length - 1).map((log: any) => {
            return (
                <div
                className="flex items-center bg-gray-900/50 p-3 rounded-lg relative"
                key={1}
                >
                    <Image alt='profile image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT77tI2-d92MthNA0HLYbVqYueO9r6P3u7zEDTYoOjLLmJVetvXJp_j1eU0v4uYUd02Jk" width={100} height={100} className='rounded-lg w-[45px] h-[45px]'></Image>
                    <div className="flex flex-col ml-5">
                        <p className="text-[15px] font-medium">{log.action}</p>
                        <p className="text-[13px] opacity-50">{log.user} {">"} <span className="text-blue-500 font-[700]">  {" "}{log.date.slice(0, 24)}</span></p>
                    </div>
                </div>
            );

            }) : null}
            {!logs.isLoading ? <Link href='/dashboard?section=allies' className="hover:underline hover:text-blue-500 mb-0">and { logs?.data.length - 3 } more...</Link> : null}

            
        </div>
      </CardContent>
    </Card>
  );
};

export default LogCard;
