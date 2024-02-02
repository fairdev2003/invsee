import { NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';

export async function POST(req: Request, res: Response){

  const client = await connectMongo();
  const db = client.db("test");

  const selected = await req.json()
  console.log(selected)

  const item = await db.collection("mods").find({mod_tag: selected.mod_tag}).toArray()
  console.log(item)
  
  return NextResponse.json(item);
}