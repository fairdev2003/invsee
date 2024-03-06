import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { connectMongo } from "@/app/api/mongo/mongo";
import Item from "../db/schemas/ItemSchema";

export const itemsRouter = router({
  get_all: publicProcedure
    .query(async () => {
      const items = await Item.find({})
      return items;
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
