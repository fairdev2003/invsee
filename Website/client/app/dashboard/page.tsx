"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { FiDatabase, FiTool, FiTag, FiSmile } from "react-icons/fi";
import { GrOverview } from "react-icons/gr";
import PFP from "@/assets/Avatar.png";
import Image from "next/image";

import DashboardSectionButton from "@/components/dashboard/DashboardSectionButton";
import { Crown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import GetSection from "@/components/dashboard/getSection";
import { useSession } from "next-auth/react";
import AuthError from "@/components/AuthError";
import { MdOutlineGridOn } from "react-icons/md";

function Page() {
  const session = useSession();

  const [admin, setAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(false);
  const [section, setsection] = useState<any>("");

  const searchParams = useSearchParams();

  async function checkRole(id: string) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login/check_admin",
        { id: id }
      );
      setAdmin(response.data.isAdmin);
    } catch (error) {
      console.error("Error checking role:", error);
    } finally {
      setLoading(false);
    }
  }
  const getUser = async (id: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login/get_user",
        { id: id }
      );

      setData(response.data[0]);
      console.log(response.data);
    } catch (error) {
      console.error("Error checking role:", error);
    } finally {
    }
  };

  useEffect(() => {
    const id: any = localStorage.getItem("user_id");

    checkRole(id);

    getUser(id);
  }, []);
  useEffect(() => {
    if (searchParams.has("section")) {
      setsection(searchParams.get("section"));
    }
  }, [searchParams]);

  const RenderAdminPage = () => {
    if (session.status !== "authenticated") {
      return (
        <div>
          <AuthError
            explaination="Please login to access this site"
            reason="You are not authenticated!"
          ></AuthError>
        </div>
      );
    } else {
      console.log("Email: ", session?.data?.user?.email);
      return data ? (
          <div className="">
            <div className="flex flex-wrap gap-5 justify-center">
              <div className="flex flex-col w-[25%] gap-4 h-[90vh] bg-[#26292f] rounded-xl p-5">
                <DashboardSectionButton
                  to="account-settings"
                  className="flex justify-start h-[100px] rounded-xl items-center"
                >
                  <Image
                    width={60}
                    height={60}
                    className="rounded-full"
                    alt="profile-pick"
                    src={PFP}
                  ></Image>
                  <div>
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
                  <p>Overview</p>
                </DashboardSectionButton>
                <DashboardSectionButton to="mods">
                  <FiDatabase clasName="text-white" size={25}></FiDatabase>
                  <p>Mods</p>
                </DashboardSectionButton>
                <DashboardSectionButton to="items">
                  <FiTool clasName="text-white" size={25}></FiTool>
                  <p>Items</p>
                </DashboardSectionButton>
                <DashboardSectionButton to="tags">
                  <FiTag clasName="text-white" size={25}></FiTag>
                  <p>Tags</p>
                </DashboardSectionButton>
                <DashboardSectionButton to="allies">
                  <FiSmile clasName="text-white" size={25}></FiSmile>
                  <p>Add Allies</p>
                </DashboardSectionButton>
                <DashboardSectionButton to="crafting">
                  <MdOutlineGridOn
                    clasName="text-white"
                    size={25}
                  ></MdOutlineGridOn>
                  <p>Crafting Recipes</p>
                </DashboardSectionButton>
              </div>
              <div className="w-[70%] h-[90vh] bg-[#26292f] rounded-xl p-10 overflow-y-scroll" id="scroll_area">
                {/* Box */}
                <GetSection section={section}></GetSection>
              </div>
            </div>
          </div>
      ) : null;
    }
  };

  return (
    <div>
      {loading === false && session ? (
        <div>
          {admin === true ? (
            RenderAdminPage()
          ) : (
            <div>
              <AuthError
                explaination="Please login to proper account to access this page!"
                reason="You are not an admin!"
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

export default Page;