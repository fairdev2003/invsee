"use client";

import ItemWorkspaceMain from "./(components)/(workspaces)/ItemWorkspace/ItemWorkspaceMain";
import {useQuery} from "@tanstack/react-query";
import axios, {AxiosError, AxiosResponse} from "axios";
import {usePersistStore} from "@/stores/persist_store";
import {GoodServerResponse} from "@/types";
import Loading from "@/app/admin/workspace/(components)/Loading";

const Page = () => {

    const { token } = usePersistStore()


    const { data, isLoading, isError } = useQuery<AxiosResponse<GoodServerResponse>, AxiosError>({
        queryKey: ["verifyUser"],
        queryFn: async () => {
            return await axios.get("http://localhost:9090/honego/v1/admin/user/verify", {
                headers: {Authorization: `Bearer ${token}`}
            });
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <div className="flex justify-center mt-[150px] text-white">No permissions</div>
    }


  return (
    <div className="mt-[130px] lg:mx-[15%] mx-[5%] flex flex-col justify-center items-center">
      <ItemWorkspaceMain/>
    </div>
  );
};

export default Page;
