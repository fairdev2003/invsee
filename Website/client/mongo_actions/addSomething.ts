import { dbConnect } from "@/db/dbConnection"

export const addSomething = () => {
    'use server'
    dbConnect()
}