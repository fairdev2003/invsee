import { NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';

export async function GET(req: Request, res: Response){

  const client = await connectMongo();
  
  const db = client.db("test");

  const admin = db.adminCommand(
    {
      dropConnections: 1,
    }
 )

  return NextResponse.json(admin);
}