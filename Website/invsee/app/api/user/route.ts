import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';
import { NextApiResponse } from "next";

export async function GET(req: NextRequest, res: Response){
    const search_by = req.nextUrl.searchParams.get('search_by') as string;
    const param = req.nextUrl.searchParams.get('name') as string;

    const client = await connectMongo();
    const db = client.db("test");

    if (!search_by || !param) {
        const users = await db.collection("users").find({}, { projection: { password: 0 } }).toArray();
        console.log("User from GET: ", users);
        return NextResponse.json(users);
        
    } else {
        const query = {[search_by]: param}
        const user = await db.collection("users").find(query, { projection: { password: 0 } }).toArray();
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

export async function PATCH(req: NextRequest, res: Response){
    // UPDATE USER

    const search_by = req.nextUrl.searchParams.get('search_by') as string;
    const value = req.nextUrl.searchParams.get('value') as string;
    const update = req.nextUrl.searchParams.get('update') as string;


    const { data } = await req.json();

    const client = await connectMongo();
    const db = client.db("test");

    const user = await db.collection("users").updateOne({[search_by]: value}, {$set: { [update]: data }})

    return NextResponse.json({message: "User updated", update: update, data: user});
  
}

export async function DELETE(req: NextRequest, res: NextApiResponse){
  
    
}