import { NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';
import { ObjectId } from "mongodb";

export async function POST(req: Request, res: Response)
  {

  const data = await req.json()

  const client = await connectMongo();
  const db = client.db("test");

  console.log("data: ", data.update_data.item_name, data.update_data.mod_tag, data.update_data.short_description, data.tag_name)

  const item = await db.collection("items").updateOne({tag_name: data.tag_name}, {$set: {
    item_name: data.update_data.item_name,
    mod_tag: data.update_data.mod_tag,
    short_description: data.update_data.short_description
  }})
  console.log("item updated: ", item)

  return NextResponse.json(data);
}