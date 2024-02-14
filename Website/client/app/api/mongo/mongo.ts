'use server'

import { MongoClient, Db } from "mongodb";

const MONGO_URI: ENV_STRING = process.env.MONGO_URI;
let cachedClient: any = null;

export async function connectMongo() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(MONGO_URI);

  cachedClient = client;
  return client;
}
