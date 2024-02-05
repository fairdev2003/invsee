'use server'

import { connectMongo } from "@/app/api/mongo/mongo";
import { ObjectId } from "mongodb";


export const getUserData = async (id: string) => {
    

    const client = await connectMongo();
    const db = client.db("test");

    const item = await db.collection("users").find({_id: new ObjectId(id)}, {projection: {password: 0, email: 0}}).toArray()

  }