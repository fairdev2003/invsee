'use server'

import { connectMongo } from "./mongo";

export default async function FindAllMods() {
    const client = await connectMongo();
    const db = client.db("test");

    const item = await db.collection("mods").find({}).toArray();
    console.log(item)

    return item;
}