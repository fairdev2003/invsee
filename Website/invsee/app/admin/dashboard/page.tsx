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
import { useEffect } from "react";
import DashboardError from "./(components)/sections/DashboardError";

const Page = () => {
  const { data: token } = useSession();

  const { selectedDashboardSection } = useDashboardStore();
  const { account_data } = useUserStore();
  const permissionWithAccess: PermissionLevel[] = [
    "ACCESS_OVERVIEW",
    "ACCESS_MODS",
    "ACCESS_WORKSPACES",
    "ACCESS_ITEMS",
    "ACCESS_PENDING",
    "ACCESS_USER_ROLES",
  ];

  const auth = new Auth(selectedDashboardSection, permissionWithAccess);

  return (
    <div className="mt-[120px]">
      {token?.expires && account_data[0] && account_data[0].role === "Admin" ? (
        <>
          {!account_data[0] && account_data.length === 0 && (
            <Authentication loading />
          )}
          <SectionSelection
            permissionWithAccess={permissionWithAccess}
            sections={sections}
          />
          {account_data[0] && account_data.length > 0 ? (
            <SectionHandler
              section={
                auth.checkPermission(
                  selectedDashboardSection,
                  permissionWithAccess
                )
                  ? auth.handleNormalSection()
                  : auth.handleAbstractSection(permissionWithAccess)
              }
            />
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
            <DashboardError title="No permissions" message="Permission are too low to load this page" errorCode={401} />
          )}
        </>
      )}
    </div>
  );
};

export default Page;
