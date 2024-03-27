import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { connectMongo } from "@/app/api/mongo/mongo";
import { db } from "@/prisma/prisma";

export const itemsRouter = router({
  get_all: protectedProcedure
    .query(async ({ctx}) => {
      console.log("Message: ", ctx.user)

      const data = await db.item.findMany({
        include: {
          mod: true
        }
      });

      const count: number = data.length;


      return { count, data };
    }),
    
  createNewItem: publicProcedure
    .input(z.object({
      authorId: z.string(),
      item_name: z.string(),
      item_tag: z.string(),
      stack_size: z.number().max(64).min(1),
      type: z.string(),
      modId: z.string(),
      short_description: z.string()
    }))
    .mutation(async (query) => {
      const { input } = query;

      const { authorId, item_name, item_tag, modId, stack_size, type, short_description } = input;

      const data = await db.item.create({
        data: {
          item_name,
          item_tag,
          authorId,
          modId,
          stack_size,
          type,
          short_description
        }
      });

      return { success: true, data }
    }), 

  getItemByQuery: publicProcedure
    .input(z.string().max(100))
    .mutation(async (input) => {
      const client = await connectMongo();
      const db = client.db("test");

      if (input.input === "") {
        const collection = await db.collection("items").find().toArray();
        return collection.slice(0,3);
      } else {
        console.log("input: ", input);
        const collection = await db
          .collection("items")
          .aggregate([
            {
              $match: {
                $or: [
                    {item_name: {$regex: input.input, $options: "i"}},
                    {tag_name: {$regex: input.input, $options: "i"}},
                    {mod_tag: {$regex: input.input, $options: "i"}}
                ]
              },
            },
            {
              $lookup: {
                from: "crafting",
                localField: "tag_name",
                foreignField: "crafting_item",
                as: "crafting_recipes",
              },
            },
            {
              $lookup: {
                from: "mods",
                localField: "mod_tag",
                foreignField: "mod_tag",
                as: "mod",
              }
            }
          ])
          .toArray();

        console.log("mutation: ", collection);
        return collection.slice(0,3);
      }
    }),  
});
