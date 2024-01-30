import { dbConnect } from "@/db/dbConnection"
import Item from "@/db/models/ItemModel"
import { model } from "mongoose"

export const  Connect = async () => {

    dbConnect()
    
    const response = await Item.find()

    console.log(response)
    
}