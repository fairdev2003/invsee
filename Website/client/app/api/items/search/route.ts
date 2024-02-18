import { NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';

export async function POST(req: Request, res: Response){

  const client = await connectMongo();
  const db = client.db("test");

  const selected = await req.json()
  console.log(selected)



  const item = await db.collection("items").aggregate([
    {
      $match: {
      $or: [
        {item_name: {$regex: selected.item_name, $options: 'i'}},
        {tag_name: {$regex: selected.item_name.replace(":", "__"), $options: 'i'}},
        {mod_tag: {$regex: selected.item_name, $options: 'i'}},
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
  ]).sort({item_name: 1}).toArray();

  return NextResponse.json(item);
}