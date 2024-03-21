"use client";

import { Suspense, useEffect, useState } from "react";
import axios from "axios";

import { FiDatabase, FiTool, FiTag, FiSmile } from "react-icons/fi";
import { GrOverview } from "react-icons/gr";
import Image from "next/image";

import { useUserStore } from "@/stores/user_store";

import DashboardSectionButton from "@/components/dashboard/DashboardSectionButton";
import { Crown } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import GetSection from "@/components/dashboard/getSection";
import { useSession } from "next-auth/react";
import AuthError from "@/components/AuthError";
import { MdOutlineGridOn } from "react-icons/md";

import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";


function Dashboard() {
  const { data: token, status } = useSession();

  const { language } = usePersistStore();

  const { account_data, setAccountData }: any = useUserStore();

  const [admin, setAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(false);
  const [section, setsection] = useState<any>("");

  const searchParams = useSearchParams();

  async function checkRole(id: any) {
    try {
      const query = `http://localhost:3000/api/user?search_by=email&name=${id}`;

      const response = await axios.get(query);
      setAdmin(
          response.data[0].role === "Admin" ||
          response.data[0].role === "Mod" ||
          response.data[0].role === "Editor"
      );
    } catch (error) {
      console.error("Error checking role:", error);
    } finally {
      setLoading(false);
    }
  }
  const getUser = async (id: any) => {
    if (id === undefined) {
      return;
    } else {
      const query = `http://localhost:3000/api/user?search_by=email&name=${id}`;
      console.log(query);

      try {
        const response = await axios.get(query);

        setData(response.data[0]);

        setAccountData(response.data);

        console.log("Zustand store: ", account_data);
      } catch (error) {
        console.error("Error checking role:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    checkRole(token?.user?.email);

    console.log("Token", token?.user?.email);

    getUser(token?.user?.email);
  }, [token?.user?.email]);
  useEffect(() => {
    if (searchParams.has("section")) {
      setsection(searchParams.get("section"));
    }
  }, [searchParams]);

  const RenderAdminPage = () => {
    if (status !== "authenticated") {
      redirect("/login");
      return;
    } else {
      return data ? (
        <Suspense fallback={<div>Loading...</div>}>
          <div className="mt-10">
            <div className="flex flex-wrap gap-5 justify-center mt-10">
              <div className="flex flex-col w-[18%] gap-4 h-[86vh] bg-none border-[1.5px] border-gray-800 rounded-xl p-5">
                <DashboardSectionButton
                  to="account-settings"
                  className="flex justify-start h-[100px] rounded-xl items-center"
                >
                  <Image
                    width={60}
                    height={60}
                    className="rounded-full"
                    alt="profile-pick"
                    src={data.image_src || "https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/users/deafult.avif"}
                    onClick={() => {
                      console.log(account_data);
                    }}
                  ></Image>
                  <div className="flex flex-col justify-start">
                    <p className="text-white font-[600] text-lg">{data.nick}</p>
                    <div className="flex gap-1">
                      <Crown className="h-5 w-5 text-orange-500"></Crown>
                      <p className="text-white font-[400] text-sm">
                        {data.role}
                      </p>
                    </div>
                  </div>
                </DashboardSectionButton>
                <DashboardSectionButton to="overview">
                  <GrOverview clasName="text-white" size={25}></GrOverview>
                  <p>{translations[language]["Dashboard"]["Overview"]}</p>
                </DashboardSectionButton>
                <DashboardSectionButton to="mods">
                  <FiDatabase clasName="text-white" size={25}></FiDatabase>
                  <p>{translations[language]["Dashboard"]["Mods"]}</p>
                </DashboardSectionButton>
                <DashboardSectionButton to="items">
                  <FiTool clasName="text-white" size={25}></FiTool>
                  <p>{translations[language]["Dashboard"]["Items"]}</p>
                </DashboardSectionButton>
                <DashboardSectionButton to="tags">
                  <FiTag clasName="text-white" size={25}></FiTag>
                  <p>{translations[language]["Dashboard"]["Tags"]}</p>
                </DashboardSectionButton>
                <DashboardSectionButton to="allies">
                  <FiSmile clasName="text-white" size={25}></FiSmile>
                  <p>{translations[language]["Dashboard"]["Users"]}</p>
                </DashboardSectionButton>
                <DashboardSectionButton to="crafting">
                  <MdOutlineGridOn
                    clasName="text-white"
                    size={25}
                  ></MdOutlineGridOn>
                  <p>{translations[language]["Dashboard"]["Crafting Recipes"]}</p>
                </DashboardSectionButton>
              </div>
              <div
                className="w-[78%] h-[86vh] bg-none border-[1.5px] border-gray-800 rounded-xl p-10 overflow-y-scroll"
                id="scroll_area"
              >
                {/* Box */}
                <GetSection section={section}></GetSection>
              </div>
            </div>
          </div>
        </Suspense>
      ) : null;
    }
  };

  return (
    <div>
      {loading === false && status ? (
        <div className="">
          {admin === true ? (
            RenderAdminPage()
          ) : (
            <div className="flex justify-center items-center">
              <AuthError
                reason="Auth Error"
                explaination="To access this page you need to login in"
              ></AuthError>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col w-full h-[750px] gap-5 justify-center items-center select-none">
          <span className="loader"></span>
          <p className="text-white">Loading Dashboard</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
