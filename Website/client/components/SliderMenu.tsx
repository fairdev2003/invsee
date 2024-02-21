import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SliderProps {
  item_tag: string;
}

const Sections = [
  "Overview",
  "Crafting",
  "Smelting",
  "Usage",
  "History",
  "Gallery",
  "Trivia",
  "References",
  "External Links",
];

const SliderMenu = ({ item_tag }: SliderProps) => {
  const searchParams: any = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [section, setsection] = useState("");

  useEffect(() => {
    if (searchParams.has("section")) {
      setsection(searchParams.get("section"));
    } else {
      setsection("overview");
      router.push(`${pathname}?section=overview`);
    }
  }, [searchParams]);

  return (
    <div>
      <p className="text-white select-none">{item_tag}</p>
      <div className="flex gap-5">
        {Sections.map((s, index) => {
          return (
            <div
              key={index}
              className={`text-white cursor-pointer active:scale-90 select-none ${
                section === searchParams.get('section') ? "text-blue-500" : "text-white"
              }`}
              onClick={() => {
                router.push(`${pathname}?section=${section}`);
              }}
            >
              {s}
            </div>
          );
        })}
        
      </div>
    </div>
  );
};

export default SliderMenu;
