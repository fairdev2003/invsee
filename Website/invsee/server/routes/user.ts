import { publicProcedure, router } from "@/server/trpc";
import { z } from "zod";
import { connectMongo } from "@/app/api/mongo/mongo";
import { db } from "@/prisma/prisma";

export const userRouter = router({

  getUsersByEmail: publicProcedure
    .input(z.string().includes("@"))
    .mutation(async (e) => {
      const{ input } = e;

      const data = await db.user.findMany({
        where: {
          email: input
        }
      })

      return data
      
  }),

  getUserByEmail: publicProcedure
    .input(z.string())
    .mutation(async (e) => {
      const { input } = e

      const data = await db.user.findFirst({
        where: {
          email: input
        },
        include: {
          posts: true
        }
      })

      return data
    }),
    
  getSingleUser: publicProcedure
    .input(z.string())
    .mutation(async (email) => {

      const { input } = email

      const data = await db.user.findFirst({
        where: {
          email: input
        },

        select: {
          id: true,
          email: true,
          password: false,
          nick: true,
          firstName: true,
          lastName: true,
          role: true,
          image: true,
          createdAt: true,
          updatedAt: true,
        }
      })

      return data
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
    }),
    login: publicProcedure
      .input(z.object({ email: z.string(), password: z.string() }))
      .mutation(async ({ input }) => {
        const { email, password } = input;
        const user = await db.user.findFirst({
          where: {
            email,
            password
          }
        });

        if (!user) {
          return {
            error: "User not found"
          }
        }

        if (user.password !== password) {
          return {
            error: "Invalid password",
            error_code: 401
          }
        }

        return {
          user
        }
      })
});
