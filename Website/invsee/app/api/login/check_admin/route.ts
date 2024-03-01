import { NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';
import { ObjectId } from "mongodb";

export async function POST(req: Request, res: Response){

  const client = await connectMongo();
  const db = client.db("test");

  const selected = await req.json()

  const item = await db.collection("users").find({_id: new ObjectId(selected.id)}, {projection: {password: 0, email: 0}}).toArray()
  console.log()

  const admin_roles = ["Admin"]

  if (item.length > 0) {
        if (item[0].role === "Admin" || item[0].role === "Mod") {
            return NextResponse.json({isAdmin: true, ...item});
        } else {
            return NextResponse.json({isAdmin: false, ...item})
        }
    
  }
  
  return NextResponse.json({isAdmin: false})
}