import { NextResponse } from "next/server";
import { connectMongo } from "@/app/api/mongo/mongo";

export async function POST(req: Request, res: Response) {
  const client = await connectMongo();
  const db = client.db("test");

  const terra_pick: any = [
    {
      crafting_item:"botania__livingwood_twig",
      crafting_type: "minecraft_crafting_2",
      crafting_grid: [
        {
          item_tag: "botania__livingwood",
          item_name: "Terrasteel",
          mod_tag: "botania",
          mod_name: "Botania",
          type: "Block",
        },
        {
          item_tag: "minecraft__air",
          item_name: "Air",
          mod_tag: "minecraft",
          mod_name: "Minecraft",
          type: "Item",
        },
        {
          item_tag: "botania__livingwood",
          item_name: "Terrasteel",
          mod_tag: "botania",
          mod_name: "Botania",
          type: "Item",
        },
        {
          item_tag: "minecraft__air",
          item_name: "Air",
          mod_tag: "minecraft",
          mod_name: "Minecraft",
          type: "Item",
        }
      ],
      crafting_products: [
        {
          item_tag: "botania__livingwood_twig",
          item_name: "Livingwood Twig",
          mod_tag: "botania",
          mod_name: "Botania",
          count: 1,
          type: "Item",
        },
      ],
    },
  ];

  try {
    const items = await db.collection("crafting").insertMany(terra_pick);

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await client.close();
  }
}
