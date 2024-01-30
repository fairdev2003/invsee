'use server'

import mongoose from "mongoose";

const MONGO_URI: any = process.env.MONGO_URI

export const dbConnect = () => {
  const new_connection = mongoose.connect(MONGO_URI).then(res => {
    console.log(res, "Connected")
  })
}



