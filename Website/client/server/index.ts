import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { connectMongo } from "@/app/api/mongo/mongo";

export const appRouter = router({
    getUsers: publicProcedure.query(async () => {
        const client = await connectMongo();
        const db = client.db('test');
        const collection = db.collection('users').find({}, {projection: {password: 0}}).toArray();

        return collection;
    }),
    setTodos: publicProcedure.input(z.string()).mutation(async (input) => {
        return input
    })
});

export type AppRouter = typeof appRouter;