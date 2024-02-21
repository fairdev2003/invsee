'use server'

import { connectMongo } from "@/app/api/mongo/mongo";

export const getItemById = async (id: string) => {

    const client = await connectMongo();
    const db = await client.db("test");
    
    console.log(id)
  
    const item = await db.collection("items").aggregate([
      {
        $match: {
          tag_name: id
        }
      },
      {
        $lookup: {
          from: "mods",
          localField: "mod_tag",
          foreignField: "mod_tag",
          as: "mod",
        }
      }
    
    ]).toArray();
  
    return item[0];
}

export const getAllItems = async () => {

    const client = await connectMongo();
    const db = await client.db("test");

    const items = await db.collection("items").find({}).toArray();

    console.log(items)

}

export const getItemsByMod = async (mod: string) => {
    
    const client = await connectMongo();
    const db = await client.db("test");
    
    const items = await db.collection("items").find({mod_tag: mod}).toArray();
    
    return items
}

export const addNewItem = async (item: any) => {
    const client = await connectMongo();
    const db = await client.db("test");

    const newItem = await db.collection("items").insertOne(item);

    return {status: "success", message: "Item added successfully", data: newItem.ops[0]};
}

export const deleteItem = async (tag_name: string) => {
    const client = await connectMongo();
    const db = await client.db("test");

    const deletedItem = await db.collection("items").deleteOne({tag_name: tag_name});

    return {status: "success", message: "Item deleted successfully", data: deletedItem};
}

export const updateItem = async (tag_name: string, item: any) => {
    const client = await connectMongo();
    const db = await client.db("test");

    const updatedItem = await db.collection("items").updateOne({tag_name: tag_name}, {$set: item});

    return {status: "success", message: "Item updated successfully", data: updatedItem};
}

export const searchItems = async (query: string, limit?: number) => {
    const client = await connectMongo();
    const db = await client.db("test");

    if (limit) {
        const items = await db.collection("items").aggregate([
            {
              $match: {
                $or: [
                    {item_name: {$regex: query, $options: 'i'}},
                    {tag_name: {$regex: query.replace(":", "__"), $options: 'i'}},
                    {mod_tag: {$regex: query, $options: 'i'}},
                ] 
              },
            },
            {
              $lookup: {
                from: "crafting",
                localField: "tag_name",
                foreignField: "crafting_item",
                as: "crafting_recipes",
              },
            },
            {
              $lookup: {
                from: "mods",
                localField: "mod_tag",
                foreignField: "mod_tag",
                as: "mod",
              }
            }
          ]).sort({item_name: 1}).limit(limit).toArray();
          return items;
    } else {
        const items = await db.collection("items").aggregate([
            {
              $match: {
                $or: [
                    {item_name: {$regex: query, $options: 'i'}},
                    {tag_name: {$regex: query.replace(":", "__"), $options: 'i'}},
                    {mod_tag: {$regex: query, $options: 'i'}},
                ] 
              },
            },
            {
              $lookup: {
                from: "crafting",
                localField: "tag_name",
                foreignField: "crafting_item",
                as: "crafting_recipes",
              },
            },
            {
              $lookup: {
                from: "mods",
                localField: "mod_tag",
                foreignField: "mod_tag",
                as: "mod",
              }
            }
          ]).sort({item_name: 1}).toArray();
          return items;
    }

}

export const createItem = async (item: any) => {

    const client = await connectMongo();
    const db = await client.db("test");

    const newItem = await db.collection("items").insertOne(item);

    return {status: "success", message: "Item added successfully", data: newItem.ops[0]};

}




