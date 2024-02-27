import LogCard from "../cards/LogCard";
import StatsCard from "../cards/StatsCard";
import { UsersWithAccess } from "../cards/UsersWithAccess";

export default function Overview() {
    return (
        <div>
            <div className="flex gap-x-3">
                <h1 className="text-2xl text-white font-[600]">Overview</h1>
                chujec
            </div>
            <div className="flex flex-wrap gap-5">
                <UsersWithAccess/>
                <LogCard/>
                <StatsCard/>
            </div>
        </div>
    )
}