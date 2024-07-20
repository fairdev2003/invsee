"use client";

import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "@radix-ui/react-separator";
import { Crown, Hammer, Star, User } from "lucide-react";
import { useUserStore } from "@/stores/user_store";
import axios from "axios";
import { redirect } from "next/navigation";
import { Select, SelectContent } from "../ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";
import { trpc } from "@/app/_trpc/client";
import { BsCircle } from "react-icons/bs";

const NavigationBar = () => {
  const { data: token, status } = useSession();

  const { account_data, setAccountData } = useUserStore();

  const { language, setLanguage } = usePersistStore();

  const [isLogged, setIsLogged] = useState<boolean>(false);

  const userStatus = trpc.user.getUserByEmail.useMutation({});

  const fetch_user = async () => {
    try {
      const response = await axios.get(
        `/api/user?search_by=email&name=${token?.user?.email}`
      );
      const email: any = token?.user?.email;
      userStatus.mutate(email);
      const data = response.data;
      setAccountData(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (token?.user?.email) {
      setIsLogged(true);
      console.log(account_data);

      fetch_user();
    } else {
      setIsLogged(false);
    }
  }, [token?.user?.email]);

  const handleLogout = async () => {
    await signOut();
    setAccountData([]);
    setIsLogged(false);
    window.location.href = "/login";
  };

  const languages = ["pl", "en", "es"];
  const [g, setg] = useState(0);

  return (
    <div className="fixed w-full z-[2] top-0">
      {account_data[0] && account_data[0].role === "Admin" ? (
        <div className="text-white font-medium justify-between bg-blue-700 flex gap-2 h-[30px] px-3 items-center">
          <div className="flex gap-3 items-center">
            <BsCircle className="text-green-500" />
            <a href="/dashboard?section=overview">
              <p className="text-[13px] cursor-pointer">DASHBOARD</p>
            </a>
            <a href="/dashboard?section=workspace">
              <p className="text-[13px] cursor-pointer">WORKSPACE</p>
            </a>
            <a href="/dashboard?section=items">
              <p className="text-[13px] cursor-pointer">ITEMS & BLOCKS</p>
            </a>

            <p
              className="text-[13px] cursor-pointer"
              onClick={() => {
                if (g === 2) {
                  setg(0);
                } else {
                  setg(g + 1);
                }
                setLanguage(languages[g]);
              }}
            >
              CHANGE LANGUAGE
            </p>
          </div>
          <a href="/dashboard?section=account-settings">
            <div className="text-[13px] flex gap-1 items-center cursor-pointer">
              <User size={20} />{" "}
              <p>
                {account_data[0].first_name.toUpperCase()}{" "}
                {account_data[0].last_name.toUpperCase()}
              </p>
            </div>
          </a>
        </div>
      ) : null}
      <div className="flex justify-between items-center p-1 bg-black h-[70Fpx] top-0 z-100">
        <a href="/">
          <h1 className="text-white text-2xl m-5 font-bold">Modopedia</h1>
        </a>
        {account_data[0] && account_data.length > 0 ? (
          <div className="flex">
            {/* <Select>
              <SelectTrigger className="w-[50px] h-[35px]">
                <Button variant="secondary" className="p-3 px-5 h-[35px]">

                    {language === "en" ? (
                      <p className="mx-3">
                        {translations[language]["Dashboard"]["English"]}
                      </p>
                    ) : null}
                    {language === "es" ? (
                      <p className="mx-3">
                        {translations[language]["Dashboard"]["Spanish"]}
                      </p>
                    ) : null}
                    {language === "pl" ? (
                      <p className="mx-3">
                        {translations[language]["Dashboard"]["Polish"]}
                      </p>
                    ) : null}
                </Button>
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-none">
                <Button
                  onClick={() => {
                    setLanguage("en");
                  }}
                  variant="outline"
                  className="w-full bg-none h-[35px] flex justify-start"
                >
                  <p>{translations[language]["Dashboard"]["English"]}</p>
                </Button>
                <Button
                  onClick={() => {
                    setLanguage("pl");
                  }}
                  variant="outline"
                  className="w-full bg-none h-[35px] flex justify-start"
                >
                  <p>{translations[language]["Dashboard"]["Polish"]}</p>
                </Button>
                <Button
                  onClick={() => {
                    setLanguage("es");
                  }}
                  variant="outline"
                  className="w-full bg-none h-[35px] flex justify-start"
                >
                  <p>{translations[language]["Dashboard"]["Spanish"]}</p>
                </Button>
              </SelectContent>
            </Select> */}
            <Popover>
              <PopoverTrigger className="mr-5">
                <Avatar>
                  <AvatarImage
                    className="w-30 h-30"
                    src={
                      account_data[0]?.image_src ||
                      "https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/users/deafult.avif"
                    }
                    alt="@avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="bg-black z-[3] text-white w-auto border-[1px] border-gray-800 p-1">
                <p className="mx-2 my-1 text-[15px] flex gap-x-2 items-center font-medium">
                  {account_data.length > 0 &&
                  account_data[0].role === "Editor" ? (
                    <Hammer size={15} className="text-orange-400" />
                  ) : null}
                  {account_data.length > 0 && account_data[0].role === "Mod" ? (
                    <Star size={15} className="text-orange-400" />
                  ) : null}
                  {account_data.length > 0 &&
                  account_data[0].role === "Admin" ? (
                    <Crown size={15} className="text-orange-400" />
                  ) : null}
                  {account_data.length > 0
                    ? account_data[0].nick
                    : "loading..."}
                </p>
                {/* <p className="mx-2 my-1 text-[12px] truncate text-gray-500">
                  {account_data.length > 0
                    ? account_data[0].email
                    : "loading..."}
                </p> */}
                <p className="mx-2 my-1 text-[12px] truncate text-red-500">
                  {account_data.length > 0
                    ? "EMAIL IS HIDDEN"
                    : "loading..."}
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
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full bg-none h-[35px] flex justify-start"
                >
                  {translations[language]["Dashboard"]["Change MC Account"]}
                </Button>
                <Button
                  onClick={handleLogout}
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
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full bg-none h-[35px] hover:bg-red-500 flex justify-start"
                >
                  {translations[language]["Dashboard"]["Logout"]}
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavigationBar;
