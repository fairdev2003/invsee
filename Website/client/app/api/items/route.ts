import { NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';

export async function GET(req: Request, res: Response){
  
  // = /api/items

  const client = await connectMongo();
  const db = client.db("test");

  const item = await db.collection("items").aggregate([

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