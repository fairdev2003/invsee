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
  const { data: token } = useSession();

  // const searchParams = useSearchParams();
  const router = useRouter();

  const { selectedDashboardSection, setSelectedDashboardSection } =
    useDashboardStore();
  const { account_data } = useUserStore();

  const permissionWithAccess: PermissionLevel[] = [
    "ACCESS_OVERVIEW",
    "ACCESS_MODS",
    "ACCESS_WORKSPACES",
    "ACCESS_ITEMS",
    "ACCESS_USER_ROLES",
  ];

  const auth = new Auth(selectedDashboardSection, permissionWithAccess);
  // useEffect(() => {
  //   if (searchParams?.get("section")) {
  //     setSelectedDashboardSection(searchParams?.get("section") as string);
  //     router.replace("/admin/dashboard");
  //   }
  // }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mt-[40px] md:mt-[120px] lg:mt-[120px]">
        {token?.expires &&
        account_data[0] &&
        account_data[0].role === "Admin" ? (
          <>
            {!account_data[0] && account_data.length === 0 && (
              <Authentication loading />
            )}
            <SectionSelection
              permissionWithAccess={permissionWithAccess}
              sections={sections}
            />
            {account_data[0] && account_data.length > 0 ? (
              <motion.div
                key={selectedDashboardSection}
                initial={{ opacity: 0, scaleY: 0.5 }}
                animate={{ opacity: 1, scaleY: 1 }}
              >
                <SectionHandler
                  section={
                    auth.checkPermission(
                      selectedDashboardSection,
                      permissionWithAccess
                    )
                      ? auth.handleNormalSection()
                      : auth.handleAbstractSection()
                  }
                />
              </motion.div>
            ) : null}
          </>
        ) : (
          <>
            {!account_data[0] && account_data.length === 0 && (
              <DashboardError
                title="Authentication Error"
                message="You need to be logged user to access this page"
                errorCode={401}
              />
            )}
            {account_data[0] && account_data[0].role !== "Admin" && (
              <DashboardError
                title="No permissions"
                message="Permission are too low to load this page"
                errorCode={401}
              />
            )}
          </>
        )}
      </div>
    </Suspense>
  );
};

export default Page;
