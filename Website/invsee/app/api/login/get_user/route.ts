import { NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';
import { ObjectId } from "mongodb";

export async function POST(req: Request, res: Response){

  const client = await connectMongo();
  const db = client.db("test");

  const selected = await req.json()

  const item = await db.collection("users").find({_id: new ObjectId(selected.id)}, {projection: {password: 0, email: 0}}).toArray()

  
  return NextResponse.json(item)
}