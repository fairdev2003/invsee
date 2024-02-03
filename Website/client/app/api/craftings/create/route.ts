import { NextResponse } from "next/server";
import { connectMongo } from "@/app/api/mongo/mongo";

export async function POST(req: Request, res: Response) {
  const client = await connectMongo();
  const db = client.db("test");

  const furnace: any = [
    {
      crafting_item: "minecraft__furnace",
      crafting_type: "minecraft_crafting_4",
      crafting_grid: [
        {
          item_tag: "minecraft__cobblestone",
          item_name: "Cobblestone",
          mod_tag: "minecraft",
          mod_name: "Minecraft",
          type: "Block",
        },
        {
          item_tag: "minecraft__cobblestone",
          item_name: "Cobblestone",
          mod_tag: "minecraft",
          mod_name: "Minecraft",
          type: "Block",
        },
        {
          item_tag: "minecraft__cobblestone",
          item_name: "Cobblestone",
          mod_tag: "minecraft",
          mod_name: "Minecraft",
          type: "Block",
        },
        {
          item_tag: "minecraft__cobblestone",
          item_name: "Cobblestone",
          mod_tag: "minecraft",
          mod_name: "Minecraft",
          type: "Block",
        },
        {
          item_tag: "minecraft__air",
          item_name: "Air",
          mod_tag: "minecraft",
          mod_name: "Air",
          type: "Item",
        },
        {
          item_tag: "minecraft__cobblestone",
          item_name: "Cobblestone",
          mod_tag: "minecraft",
          mod_name: "Minecraft",
          type: "Block",
        },
        {
          item_tag: "minecraft__cobblestone",
          item_name: "Cobblestone",
          mod_tag: "minecraft",
          mod_name: "Minecraft",
          type: "Block",
        },
        {
          item_tag: "minecraft__cobblestone",
          item_name: "Cobblestone",
          mod_tag: "minecraft",
          mod_name: "Minecraft",
          type: "Block",
        },
        {
          item_tag: "minecraft__cobblestone",
          item_name: "Cobblestone",
          mod_tag: "minecraft",
          mod_name: "Minecraft",
          type: "Block",
        },
      ],
      crafting_products: [
        {
          item_tag: "minecraft__furnace",
          item_name: "Furnace",
          mod_tag: "minecraft",
          mod_name: "Minecraft",
          type: "Block",
          count: 1,
        },
      ],
    },
  ];

  try {
    const items = await db.collection("crafting").insertMany(furnace);

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await client.close();
  }
}
