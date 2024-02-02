import { NextResponse } from "next/server";
import FindAllMods from "../mongo/FindAllMods";
import { connectMongo } from "../mongo/mongo";

export async function GET(req: Request, res: Response){

  const client = await connectMongo();
  let db = client.db("test");

  const item = await db.collection("mods").aggregate([
    {
        $lookup: {
            from: "items",
            localField: "mod_tag",
            foreignField: "mod_tag",
            as: "items"
        }
    }
]).toArray();
  console.log(item)
  
  return NextResponse.json(item);
}
export async function POST(req: Request, res: Response){
  
  return NextResponse.json({text: "siusiak"});
}