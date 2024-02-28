import LogCard from "../cards/LogCard";
import QuickStatsCard from "../cards/QuickStatsCard";
import StatsCard from "../cards/StatsCard";
import { UsersWithAccess } from "../cards/UsersWithAccess";

import { useLanguageStore } from "@/stores/language_store";
import { translations } from "@/utils/translations";

export default function Overview() {
    const { language } = useLanguageStore()


    return (
        <div>
            <div className="flex gap-x-3">
                <h1 className="text-2xl text-white font-[600]">{translations[language]["Dashboard"]["Overview"]}</h1>
                
            </div>
            <div className="flex flex-wrap gap-5">
                <UsersWithAccess/>
                <LogCard/>
                <StatsCard/>
                <QuickStatsCard/>
            </div>
        </div>
    )
}