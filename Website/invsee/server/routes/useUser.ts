import { publicProcedure, router } from "@/server/trpc";
import { z } from "zod";
import { connectMongo } from "@/app/api/mongo/mongo";

// tRPC router

export const userRouter = router({
  updateUserRole: publicProcedure
    .input(z.object({ email: z.string(), role: z.string() }))
    .mutation(async (input) => {

      const client = await connectMongo();
      const db = client.db("test");

      const { email, role } = input.input;
      
      const collection = db.collection("users").updateOne(
        { email },
        { $set: { role } }
      );

      return collection;
  }),
  updateUserData: publicProcedure
    .input(z.object({ email: z.string(), data: z.object({
      firstname: z.string(),
      lastname: z.string(),
      nick: z.string(),
      role: z.string()
    }) }))
    .mutation(async (input) => {
      const client = await connectMongo();
      const db = client.db("test");

      const { email, data } = input.input;
      
      const collection = db.collection("users").updateOne(
        { email },
        { $set: data }
      );

      return collection;
    }),
});
