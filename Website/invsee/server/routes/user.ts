import { publicProcedure, router } from "@/server/trpc";
import { z } from "zod";
import { connectMongo } from "@/app/api/mongo/mongo";
import { db } from "@/prisma/prisma";

export const userRouter = router({

  getUser: publicProcedure
    .query(async () => {

      interface SearchByInterface {
        key: string,
        value: string
      }

      const searchBy: SearchByInterface = {
        key: "role",
        value: "Admin"
      }

      const { key, value } = searchBy
      
      const data = await db.user.findMany({
        include: {
          posts: true
        }
      })

      return data 
      
    }),
    
    
  getSingleUser: publicProcedure
    .input(z.string())
    .mutation(async (email) => {
      const client = await connectMongo();
      const db = client.db("test");

      const collection = db.collection("users").findOne({email}, {projection: {password: 0}})


      return collection
    }),

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
      first_name: z.string(),
      last_name: z.string(),
      nick: z.string(),
      role: z.string()
    }) }))
    .mutation(async (input) => {
      const client = await connectMongo();
      const db = client.db("test");

      const { email, data } = input.input;

      console.log("data", {...data, email})
      
      const collection = await db.collection("users").updateOne(
        { email },
        { $set: data }
      );

      return collection;
    })
});
