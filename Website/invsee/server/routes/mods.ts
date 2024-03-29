import { publicProcedure, protectedProcedure , router } from "../trpc";
import { z } from "zod";
import { db } from "@/prisma/prisma";

const ModLoadersEnum = z.enum(["FORGE", "FABRIC", "NEOFORGE", "QUILT"])

export const modsRouter = router({

    // Get mods without any relations
    getRawMods: publicProcedure
        .query(async () => {
            const data = await db.mod.findMany()

            const count = await db.mod.count()

            return { data, count }
    }),


    // get mods with relations
    getMods: publicProcedure
        .query(async () => {
            const data = await db.mod.findMany({
                include: {
                    items: {
                        include: {
                            author: true,
                            gallery: true,
                            mod: true
                        }
                    }
                }
            })
            const count = await db.mod.count()
            return { data, count }
    }),

    createMod: protectedProcedure
        .input(z.object({
            modName: z.string(),
            image_src: z.string(),
            modDescription: z.string(),
            tag: z.string(),
            modloaders: z.array(ModLoadersEnum)
        }))
        .mutation(async ({ input, ctx }) => {

            const { image_src, modDescription, modName, modloaders, tag } = input

            const create_response = await db.mod.create({
                data: {
                    modName,
                    image_src,
                    modDescription,
                    modloaders,
                    tag,
                    userId: `${ctx.user?.id}`
                }
            })

            return { status: "OK", response: create_response }
        }),
    updateMod: protectedProcedure
        .input(z.object({
            data: z.object({
                modName: z.string(),
                image_src: z.string(),
                modDescription: z.string(),
                tag: z.string(),
                modloaders: z.array(ModLoadersEnum)
            }),
            id: z.string()
        }))
        .mutation(async ({input, ctx}) => {

            const { data, id } = input
            const { image_src, modDescription, modName, modloaders, tag } = data

            const update_response = await db.mod.update({
                where: {
                    id
                },
                data: {
                    modName,
                    image_src,
                    modDescription,
                    modloaders,
                    tag,
                    userId: `${ctx.user?.id}`
                }
            })
            return { status: "OK", response: update_response }
        }),
    deleteMod: protectedProcedure
    .input(z.object({
        id: z.string()
    }))
    .mutation(async ({ input, ctx }) => {

        const { id } = input

        const update_response = await db.mod.delete({
            where: {
                id
            }
        })

        return { status: "OK", response: update_response }
    })
})