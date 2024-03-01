import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { connectMongo } from "@/app/api/mongo/mongo";
import { PrismaClient } from "@prisma/client";
import { db } from "@/prisma/prisma";

export const logRouter = router({
    
    getAllLogs: publicProcedure.query(async () => {
        const client = await connectMongo();
        const db = client.db("test");
        const collection = db.collection("logs").find({}, { projection: { _id: 0 } }).toArray();

        return collection;
    }),

    addLog: publicProcedure
        .input(z.object({ action: z.string(), user: z.string() }))
        .mutation(async (input) => {
            const { action, user } = input.input;
            const date = new Date().toString();

            const client = await connectMongo();
            const db = client.db("test");
            const collection = db.collection("logs").insertOne({ action, user, date });
            return collection;
        })

})

