import { NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';

export async function GET(req: Request, res: Response){
  
  // = /api/items

  const client = await connectMongo();
  const db = client.db("test");

  const item = await db.collection("items").find({}).toArray();
  console.log(item)
  
  return NextResponse.json(item);
}