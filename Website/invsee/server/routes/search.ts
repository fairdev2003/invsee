import { db } from "@/prisma/prisma";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { searchForItems, searchForMods } from "../search_helpers";

const websiteroute = [
    {   
        id: 1,
        name: "Workspace",
        url: "/admin/workspace",
        description: "The workspace is where you can manage your items, mods, and other data."
    },
    {   
        id: 1,
        name: "Home",
        url: "/admin/workspace",
        description: ""
    },

        

]

export const searchRouter = router({

    searchEverything: publicProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            
            const items = await searchForItems(input)
            const mods = await searchForMods(input)
            const links = websiteroute.filter((item) => item.name.toLowerCase().includes(input.toLowerCase()))

            console.log(items.items)

            return { items: items.items, mods: mods.mods, links: links }
        }),


});