import { NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';

export async function POST(req: Request, res: Response){

  const client = await connectMongo();
  const db = client.db("test");

  const selected = await req.json()

  const item = await db.collection("users").findOne({$and: [
    { email: selected.email }
  ]}, {projection: {password: 0, email: 0}})
  console.log(item)
  
  return NextResponse.json(item);
}