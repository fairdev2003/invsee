import { connectMongo } from "@/app/api/mongo/mongo"

export const getAllUsers = async () => {
    return "All users"
}
export const getUserById = async (id: string) => {
    return "User by id"
}
export const getUserByEmail = async (id: string) => {
    return "User by email"
}

export const checkAdmin = async (email: string) => {
    const client = await connectMongo();
    const db = await client.db("test");

    const user = await db.collection("users").findOne({email: email});

    return user.role === "Admin";
}


export const registerUser = async (data: string) => {
    return "Check admin"
}
export const deleteAccount = async (email: string) => {
    return "Check admin"
}