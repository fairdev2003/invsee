'use client'

import { useEffect, useState } from "react";
import axios from "axios";

import { FiAlertTriangle, FiDatabase, FiTool, FiTag, FiSmile } from "react-icons/fi";
import { GrOverview } from "react-icons/gr";
import PFP from '@/assets/Avatar.png'
import Image from "next/image";

import Link from "next/link";
import DashboardSectionButton from "@/components/dashboard/DashboardSectionButton";
import { Crown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import GetSection from "@/components/dashboard/getSection";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { getSession, useSession } from "next-auth/react";


function Page() {
  const session = useSession()
  console.log(session)

  const [admin, setAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(false);
  const [section, setsection] = useState<any>('');

  const searchParams = useSearchParams()
  const router = useRouter()

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
    if (searchParams.has('section')) {
      setsection(searchParams.get('section'))
    }
  }, [searchParams]);

  const RenderAdminPage = () => {
    return data ? (
      <div className="flex flex-col gap-5 items-center justify-center">
        <h1 className="text-3xl text-white">Hello {data.nick} 👋</h1>
        <p>{session.data?.user?.email}</p>
        <div className="flex flex-wrap gap-5 m-5">
          <div className="flex flex-col gap-4 w-[400px] h-[100vh] bg-[#26292f] rounded-xl p-5">
            <DashboardSectionButton to="account-settings" className="flex justify-start h-[100px] rounded-xl items-center">
              <Image width={60} height={60} className="rounded-full" alt='profile-pick' src={PFP}></Image>
              <div>
                <p className="text-white font-[600] text-lg">{data.nick}</p>
                <div className="flex gap-1"><Crown className="h-5 w-5 text-orange-500"></Crown><p className="text-white font-[400] text-sm">{data.role}</p></div>
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
                <FiTool  clasName="text-white" size={25}></FiTool >
                <p>Items</p>
            </DashboardSectionButton>
            <DashboardSectionButton to="tags">
                <FiTag clasName="text-white" size={25}></FiTag >
                <p>Tags</p>
            </DashboardSectionButton>
            <DashboardSectionButton to="allies">
                <FiSmile  clasName="text-white" size={25}></FiSmile >
                <p>Add Allies</p>
            </DashboardSectionButton>
          </div>
          <div className="w-[1600px] h-[100vh] bg-[#26292f] rounded-xl p-10">
            <GetSection section={section}></GetSection>
          </div>
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="flex justify-center items-center">
      {loading === false ? (
        <div>
          {admin === true ? (
            RenderAdminPage()
          ) : (
            <div className="flex flex-col gap-5 items-center justify-center">
              <FiAlertTriangle className="text-red-500" size={75} />
              <p className="text-white select-none">You are not an Admin!</p>
              <Link
                href="/login"
                className="underline text-blue-500 hover:text-blue-400"
              >
                Return to login page
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-5 justify-center items-center select-none">
          <span className="loader"></span>
          <p className="text-white">Loading Dashboard</p>
        </div>
      )}
    </div>
  );
}

export default Page;
