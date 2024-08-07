"use client";

import SectionHandler from "./(components)/SectionHandler";
import SectionSelection from "./(components)/SectionSelection";
import { sections } from "./(stores)/types/dashboardTypes";
import { useDashboardStore } from "./(stores)/dashboardStore";
import Authentication from "./(components)/Authentication";
import { useUserStore } from "@/stores/user_store";
import { PermissionLevel } from "@/lib/types/userTypes";
import { useEffect } from "react";
import { Auth } from './index'

const Page = () => {
  const { selectedDashboardSection } = useDashboardStore();
  const { account_data } = useUserStore();

  
  const permissionWithAccess: PermissionLevel[] = [
    "ACCESS_OVERVIEW",
    "ACCESS_MODS",
    "ACCESS_WORKSPACES",
    "ACCESS_ITEMS",
    "ACCESS_PENDING",
    "ACCESS_USER_ROLES"
  ];

  const auth = new Auth(selectedDashboardSection, permissionWithAccess);

  return (
    <div className="mt-[120px]">
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
            auth.checkPermission(selectedDashboardSection, permissionWithAccess)
              ? auth.handleNormalSection()
              : auth.handleAbstractSection(permissionWithAccess)
          }
        />
      ) : null}
    </div>
  );
};

export default Page;
