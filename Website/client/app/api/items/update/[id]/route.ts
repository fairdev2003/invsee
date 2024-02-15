import { NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';
import { ObjectId } from "mongodb";

export async function POST(req: Request, res: Response
  )
  {

  const data = await req.json()

  const client = await connectMongo();
  const db = client.db("test");

  const item = await db.collection("items").updateOne({_id: data.id}, {$set: {}})
  console.log(item)


  

  return NextResponse.json(data);
}