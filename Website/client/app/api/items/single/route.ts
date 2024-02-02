import { NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';

export async function POST(req: Request, res: Response){

  const client = await connectMongo();
  const db = client.db("test");

  const selected = await req.json()
  console.log(selected)

  const item = await db.collection("items").find({tag_name: selected.tag_name}).toArray()
  console.log(item)
  
  return NextResponse.json(item);
}