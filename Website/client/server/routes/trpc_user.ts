import { publicProcedure, router } from "@/server/trpc";
import { z } from "zod";
import { connectMongo } from "@/app/api/mongo/mongo";


export const userRouter = router({
    getUserByEmail: publicProcedure
        .input(z.string().includes("@").max(100))
        .query(async (input) => {
            const client = await connectMongo();

            console.log(input.input);
            const db = client.db("test");
            const collection = db.collection("users").findOne({ email: input.input });
            return collection;
        }),
    getUsers: publicProcedure.query(async () => {     
        const client = await connectMongo();
        const db = client.db("test");
        const collection = db.collection("users").find({}, { projection: { _id: 0, password:  } }).toArray();
        return collection;
    })
     
  });