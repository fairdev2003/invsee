"use client";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "@radix-ui/react-separator";
import { Crown, Hammer, Settings, Star, User } from "lucide-react";
import { useUserStore } from "@/stores/user_store";
import { redirect } from "next/navigation";
import { AdminStripe } from "../NavComponents/AdminStripes";
import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";
import { useWorkspaceStore } from "@/app/admin/workspace/stores/workspaceBroswerData";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError, AxiosResponse} from "axios";
import {ErrorServerResponse, UserType} from "@/types";

const NavigationBar = () => {

  const api = useMutation({
    mutationFn: (token: string) => {
      return axios.get("http://localhost:9090/honego/v1/private/user/me", {headers: {
          Authorization: `Bearer ${token}`
        }})
    },
    onSuccess: (response: AxiosResponse<Omit<UserType, "password">>) => {
      setAccountData(response.data);
    },
    onError: (error: AxiosError<ErrorServerResponse>) => {
      setError(error)
      console.log(error)
    }
  })

  const { account_data, setAccountData } = useUserStore();
  const [ error, setError ] = useState<AxiosError<ErrorServerResponse> | null>(null);
  const { setpage, itemWorkspace } = useWorkspaceStore();
  const { language, setLanguage, token, setToken } = usePersistStore();
  const fetch_user = async () => {
    try {
      api.mutate(token);
    } catch (error) {

    }
  }

  useEffect(() => {
    if (error?.response?.data.code === 401) {
      setError(null);
      setAccountData(null);
      setToken("");
    }
  }, [error]);

  useEffect(() => {
    fetch_user()
  }, []);

  const handleLogout = () => {
    setAccountData({});
    setToken("")
    if (location.pathname != "/login") {
      window.location.href = "/login";
    }
  };

  return (
    <div className="w-full z-[2] top-0">
      <div className="flex justify-between items-center p-1 bg-black h-[100px] top-0 z-100">
        <div className="flex gap-2 items-center">
          <a href="/">
            <h1 className="text-white text-2xl m-5 font-bold">Modopedia</h1>
          </a>
          <SearchBar />
        </div>

        {account_data && account_data._id ? (
          <div className="flex">
            <Popover>
              <PopoverTrigger className="mr-5">
                <Avatar>
                  <AvatarImage
                    className="w-30 h-30"
                    src={
                      account_data.image
                    }
                    alt="@avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="bg-black z-[3] text-white w-auto border-[1px] border-gray-800 p-1">
                <p className="mx-2 my-1 text-[15px] flex gap-x-2 items-center font-medium">
                  {account_data &&
                  account_data.role === "Editor" ? (
                    <Hammer size={15} className="text-orange-400" />
                  ) : null}
                  {account_data && account_data.role === "Mod" ? (
                    <Star size={15} className="text-orange-400" />
                  ) : null}
                  {account_data &&
                  account_data.role === "Admin" ? (
                    <Crown size={15} className="text-orange-400" />
                  ) : null}
                  {account_data
                    ? account_data.nick
                    : "loading..."}
                </p>
                {/* <p className="mx-2 my-1 text-[12px] truncate text-gray-500">
                  {account_data.length > 0
                    ? account_data[0].email
                    : "loading..."}
                </p> */}
                <p className="mx-2 my-1 text-[12px] truncate text-red-500">
                  {account_data ? "EMAIL IS HIDDEN" : "loading..."}
                </p>
                <Separator
                  orientation="horizontal"
                  className="w-full h-[1px] bg-gray-800"
                ></Separator>
                <Button
                  onClick={() => {
                    redirect("/dashboard?section=account-settings");
                  }}
                  variant="outline"
                  className="w-full bg-none h-[35px] mt-1 flex justify-start"
                >
                  {translations[language]["Dashboard"]["Settings"]}
                </Button>
                <Button

                  variant="outline"
                  className="w-full bg-none h-[35px] flex justify-start"
                >
                  {translations[language]["Dashboard"]["Change MC Account"]}
                </Button>
                <Button

                  variant="outline"
                  className="w-full bg-none h-[35px] flex justify-start"
                >
                  {translations[language]["Dashboard"]["Billing"]}
                </Button>
                <Button
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                  variant="outline"
                  className="w-full bg-none h-[35px] flex justify-start"
                >
                  {translations[language]["Dashboard"]["Change Account"]}
                </Button>
                <Button
                  onClick={() => {
                    handleLogout();
                  }}
                  variant="outline"
                  className="w-full bg-none h-[35px] hover:bg-red-500 flex justify-start"
                >
                  {translations[language]["Dashboard"]["Logout"]}
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            variant="secondary"
            className="mr-5"
            onClick={() => {
                console.log(account_data)
                window.location.href = "/login"
            }}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
