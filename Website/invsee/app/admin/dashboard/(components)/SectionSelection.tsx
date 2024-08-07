"use client";

import { useDashboardStore } from "../(stores)/dashboardStore";
import type { PermissionLevel } from "@/lib/types/userTypes";
import { Section } from "../(stores)/types/dashboardTypes";
import { useEffect } from "react";

type SectionSelectionComponentProps = {
  sections: Section[];
  className?: string;
  permissionWithAccess: PermissionLevel[];
};

type SectionTileComponentProps = {
  name: string;
  active: boolean;
  onClick: () => void;
};

const SectionSelection = ({
  sections,
  className,
  permissionWithAccess,
}: SectionSelectionComponentProps) => {
  const { setSelectedDashboardSection, selectedDashboardSection } =
    useDashboardStore();

  return (
    <div className="w-full h-auto flex gap-5 justify-start items-end p-4 pb-0 px-10">
      {sections.map((section) => {
        return (
          <>
            {permissionWithAccess.includes(section.accessLevel) ? (
              <SectionTile
                key={section.id}
                name={section.name}
                active={section.tag === selectedDashboardSection}
                onClick={() => setSelectedDashboardSection(section.tag)}
              />
            ) : null}
          </>
        );
      })}
    </div>
  );
};

const SectionTile = ({ name, active, onClick }: SectionTileComponentProps) => {
  return (
    <div className="cursor-pointer group" onClick={onClick}>
      <h1
        className={`text-2xl font-bold group-hover:text-blue-500 transition-colors  ${
          active ? "text-blue-500" : "text-white"
        }`}
      >
        {name}
      </h1>
      <div
        className={`h-1 mt-2 w-full mb-1 group-hover:bg-blue-500 transition-opacity ${
          active ? "bg-blue-500" : "bg-transparent"
        } rounded-full`}
      ></div>
    </div>
  );
};

export default SectionSelection;
