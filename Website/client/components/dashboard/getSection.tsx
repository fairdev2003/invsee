import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { GrOverview } from "react-icons/gr";
import AccountSettings from "./sections/AccountSettings";
import Allies from "./sections/Allies";
import Tags from "./sections/Tags";
import Items from "./sections/Items";
import Mods from "./sections/Mods";
import Overview from "./sections/Overview";

interface SectionProps {
  className?: string 
  section : any
}

export default function GetSection({
  className,
  section
}: SectionProps) {
  return (
    <section>
      {section === "overview" ? <Overview/> : null}
      {section === "mods" ? <Mods/> : null}
      {section === "items" ? <Items/> : null}
      {section === "tags" ? <Tags/> : null}
      {section === "allies" ? <Allies/> : null}
      {section === "account-settings" ? <AccountSettings/> : null}
    </section>
  );
}