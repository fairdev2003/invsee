import { UsersWithAccess } from "../cards/UsersWithAccess";

export default function Overview() {
    return (
        <div>
            <h1 className="text-2xl text-white font-[600]">Overview</h1>
            <div>
                <UsersWithAccess/>
            </div>
        </div>
    )
}