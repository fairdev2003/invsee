import { publicProcedure, router } from "@/server/trpc";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { db } from "@/prisma/prisma";

// trpc router

export const userRouter = router({
  getUserByEmail: publicProcedure
    .input(z.string().includes("@").max(100))
    .query(async (input) => {
      console.log("Input: ", input);
      const user = await db.user.findFirst({
        where: {
          email: input.input,
        },
      });;

      return user;
    }),
  getAllUsers: publicProcedure.query(async () => {
    const db = new PrismaClient();
    const users = db.user.findMany({
      select: { email: true, id: true, nick: true },
    });

    return users;
  }),
});
