import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { GrOverview } from "react-icons/gr";

interface DashboardSectionButtonProps {
  children?: ReactNode;
  className?: string;
  to?: string;
}

export default function DashboardSectionButton({
  children,
  className,
  to,
}: DashboardSectionButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [selected, setSelcted] = useState<any>('')
  useEffect(() => {
    setSelcted(searchParams.get('section'))
  }, [searchParams])
  return (
    <button
      onClick={() => {
        router.push(`/dashboard?section=${to ? to : "overview"}`);
      }}
      className={cn(
        `bg-[#32343a] select-none w-full h-[50px] rounded-xl border-[3px] ${selected === to ? "border-blue-500 text-blue-500 bg-blue-500/30 hover:bg-blue-500/10 font-[600]" : "border-none text-white hover:bg-[#222327]"} flex items-center px-3 gap-3  transition-colors`,
        className
      )}
    >
      <div className="flex gap-3 justify-start items-center">{children}</div>
    </button>
  );
}


