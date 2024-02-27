import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { connectMongo } from "@/app/api/mongo/mongo";
import { userRouter } from "./routes/useUser";
import { logRouter } from "./routes/actionLog";
import { itemsRouter } from "./routes/items";

export const appRouter = router({
  getOverviewStats: publicProcedure.query(async () => {
    const client = await connectMongo();
    const db = client.db("test");
    const items = await db.collection("items").find().count();
    const users = await db.collection("users").find().count();
    const logs = await db.collection("logs").find().count();
    const stats = {
      items,
      users,
      logs
    }
    console.log("Count", stats);
    return stats;
  }),
  getUsers: publicProcedure.query(async () => {
    const client = await connectMongo();
    const db = client.db("test");
    const collection = await db
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
  items: itemsRouter
  
   
});

export type AppRouter = typeof appRouter;
