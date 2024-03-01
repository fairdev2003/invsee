import { NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';
import { ObjectId } from "mongodb";

export async function GET(req: Request, res: Response){

  const client = await connectMongo();
  const db = client.db("test");

  const item = await db.collection("users").find({}, {projection: {password: 0}}).toArray()
  console.log(item)

  return NextResponse.json(item)
}