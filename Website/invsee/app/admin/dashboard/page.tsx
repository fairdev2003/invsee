"use client";

import SectionHandler from "./(components)/SectionHandler";
import SectionSelection from "./(components)/SectionSelection";
import { sections } from "./(stores)/types/dashboardTypes";
import { useDashboardStore } from "./(stores)/dashboardStore";
import Authentication from "./(components)/Authentication";
import { useUserStore } from "@/stores/user_store";
import { PermissionLevel } from "@/lib/types/userTypes";
import { Auth } from "./index";
import { useSession } from "next-auth/react";
import DashboardError from "./(components)/sections/DashboardError";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const Page = () => {

    const api = {

    };

    return (
      <div className="text-white">
          <p>Siema</p>
      </div>
  );
};

export default Page;
