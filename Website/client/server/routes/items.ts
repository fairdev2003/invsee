import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { connectMongo } from "@/app/api/mongo/mongo";
import { PrismaClient } from "@prisma/client";
import { db } from "@/prisma/prisma";

export const itemsRouter = router({
    
    

})