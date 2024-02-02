'use server'

import { MongoClient } from "mongodb";

const MONGO_URI: ENV_STRING = process.env.MONGO_URI;
let client: any = null

export async function connectMongo() {
    try {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log("Connected to MongoDB");
        return client;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return null;
    }
}