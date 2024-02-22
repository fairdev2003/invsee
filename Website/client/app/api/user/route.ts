import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';
import { createItem, updateItem } from "@/actions/itemHelpers";
import { create } from "domain";
import { NextApiResponse } from "next";

export async function GET(req: NextRequest, res: Response){
    const search_by = req.nextUrl.searchParams.get('search_by') as string;
    const param = req.nextUrl.searchParams.get('name') as string;

    const client = await connectMongo();
    const db = client.db("test");

    if (!search_by || !param) {
        const users = await db.collection("users").find({}).toArray();
        console.log("User from GET: ", users);
        return NextResponse.json(users);
        
    } else {
        const query = {[search_by]: param}
        const user = await db.collection("users").find(query).toArray();
        console.log("User from GET: ", user);
        return NextResponse.json(user);
    }
}

export async function POST(req: Request, res: Response){
    const data = await req.json();

    const client = await connectMongo();
    const db = client.db("test");

    const user = await db.collection("users").insertOne(data);
    
    return NextResponse.json({message: "User created", user: user});
}

export async function PATCH(req: Request, res: Response){

  
}

export async function DELETE(req: NextRequest, res: NextApiResponse){
  
    
}