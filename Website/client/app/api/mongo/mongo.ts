'use server'

import { MongoClient } from "mongodb";

const MONGO_URI: ENV_STRING = process.env.MONGO_URI;
let client: MongoClient | null = null;

export async function connectMongo() {
    try {
        if (client === null) {
            client = new MongoClient(MONGO_URI);
            await client.connect();
            console.log("Connected to MongoDB");
            return client
        } else {
            console.log("Connected again");
            return client
        }
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}