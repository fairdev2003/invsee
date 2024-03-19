'use client'

import LogCard from "../cards/LogCard";
import QuickStatsCard from "../cards/QuickStatsCard";
import StatsCard from "../cards/StatsCard";
import { UsersWithAccess } from "../cards/UsersWithAccess";

import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";
import UsersCount from "../cards/UsersCount";
import { trpc } from "@/app/_trpc/client";

export default function Overview() {
    const { language } = usePersistStore()

    const data = trpc.getOverviewStats.useQuery()
    console.log("trpc", data.data)

    return (
        <div>
            <div className="flex flex-col gap-y-3">
                <h1 className="text-2xl text-white font-[600]">{translations[language]["Dashboard"]["Overview"]}</h1>
            </div>
            <div className="flex flex-wrap gap-5">
                <div className="grid grid-cols-4 place-content-center justify-center flex-wrap w-[100%] mt-5 gap-5">
                    <UsersCount card_name="Users" count={ data.data?.users } link='allies'/>
                    <UsersCount card_name="Items" count={ data.data?.items } link='items'/>
                    <UsersCount card_name="Mods" count={ data.data?.mods } link='mods'/>
                    <UsersCount card_name="Wiki Pages" count={ data.data?.wiki_pages } link='allies'/>
                    <UsersCount card_name="Authors" count={ data.data?.users } link='allies'/>
                    <UsersCount card_name="Tags" count={ data.data?.tags } link='tags'/>
                    <UsersCount card_name="Music" count={ data.data?.music } link='allies'/>
                    <UsersCount card_name="Crafting" count={ data.data?.crafting } link='crafting'/>
                </div>
                <UsersWithAccess/>
                <LogCard/>
                <StatsCard/>
                <QuickStatsCard/>
            </div>
        </div>
    )
}