'use server'

import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from '@/app/api/mongo/mongo';
import { NextApiRequest, NextApiResponse } from "next";
import { searchItems } from "@/actions/itemActions";

export async function GET(request: NextRequest, response: NextApiResponse){

  const client = await connectMongo();
  const db = client.db("test");

  const query = request.nextUrl.searchParams.get("query") as string;
  const limit = parseInt(request.nextUrl.searchParams.get("limit") as string);
  try {
    if (limit) {
      const data = await searchItems(query, limit);
      return NextResponse.json(data)
    } else {
      const data = await searchItems(query);
      return NextResponse.json(data)
    }
  } catch (error) {
    console.error("Something went wrong", error);
    return response.status(500).json({message: "Something went wrong"});
  }
}