import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { connectMongo } from "@/app/api/mongo/mongo";
import { userRouter } from "./routes/useUser";
import { logRouter } from "./routes/actionLog";

export const appRouter = router({
  getUsers: publicProcedure.query(async () => {
    const client = await connectMongo();
    const db = client.db("test");
    const collection = db
      .collection("items")
      .find({}, { projection: { _id: 0 } })
      .toArray();

    return collection;
  }),
  getDate: publicProcedure
    .input(z.object({ name: z.string(), id: z.number() }))
    .mutation(async (input) => {
      const { name, id } = input.input;
      console.log(name.substring( 0 , 24 ), id);
      return input;
    }),
  user: userRouter,
  log: logRouter,
  
   
});

export type AppRouter = typeof appRouter;
