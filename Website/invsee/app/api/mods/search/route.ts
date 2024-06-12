import { NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';

export async function POST(req: Request, res: Response){

  const client = await connectMongo();
  const db = client.db("test");

  const selected = await req.json()
  console.log(selected.query)

  const item = await db.collection("mods").find({

    $or: [
      {mod_name: {$regex: selected.query, $options: 'i'}},
      {mod_tag: {$regex: selected.query, $options: 'i'}},
      {level_of_complexity: {$regex: selected.query, $options: 'i'}},
    ]

    

  }).toArray()

  console.log(item)

  return NextResponse.json(item);
}