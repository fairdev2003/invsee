import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';
import { createItem, updateItem } from "@/actions/itemActions";
import { create } from "domain";
import { NextApiResponse } from "next";

export async function GET(req: Request, res: Response){
  
  // = /api/items

  const client = await connectMongo();
  const db = client.db("test");

  const item = await db.collection("items").aggregate([

    {
      $lookup: {
        from: "mods",
        localField: "mod_tag",
        foreignField: "mod_tag",
        as: "mod",
      }
    }
  
  ]).sort({item_name: 1}).toArray();

  return NextResponse.json(item);
}
export async function POST(req: Request, res: Response){

  const client = await connectMongo();
  const db = client.db("test");

  const body = await req.json()
  const server_response = await createItem(body);

  return NextResponse.json({message: "Item created", server_response: server_response});
}

export async function PUT(req: Request, res: Response){

    

  const client = await connectMongo();
  const db = client.db("test");

  const body = await req.json()
  const server_response = {message: "Item updated"};

  return NextResponse.json({message: "Item updated", server_response: server_response});
}

export async function DELETE(req: NextRequest, res: NextApiResponse){
  
    const client = await connectMongo();
    const db = client.db("test");

    const item = req.nextUrl.searchParams.get("item") as string;

    const server_response = await db.collection("items").deleteOne({tag_name: item});
  
    return NextResponse.json({message: "Item deleted", server_response: server_response});
}