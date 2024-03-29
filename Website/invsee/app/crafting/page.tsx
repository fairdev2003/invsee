"use client";

import { CraftingBig } from "@/components/crafting_components/CraftingBig";
import { CraftingSmall } from "@/components/crafting_components/CraftingSmall";
import { connectMongo } from '@/app/api/mongo/mongo'
import { useEffect, useState } from "react";

const furnace: any = [
  {
    crafting_type: "minecraft_crafting",
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

const pattern_provider: any = [
  {
    crafting_type: "minecraft_crafting",
    crafting_grid: [
      {
        item_tag: "minecraft__iron_ingot",
        item_name: "Iron Ingot",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Item",
      },
      {
        item_tag: "minecraft__crafting_table",
        item_name: "Crafting Table",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Block",
      },
      {
        item_tag: "minecraft__iron_ingot",
        item_name: "Iron Ingot",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Item",
      },
      {
        item_tag: "ae2__annihilation_core",
        item_name: "Annihilation Core",
        mod_tag: "ae2",
        mod_name: "Applied Enegistics 2",
        type: "Item",
      },
      {
        item_tag: "minecraft__air",
        item_name: "Air",
        mod_tag: "minecraft",
        mod_name: "Air",
        type: "item",
      },
      {
        item_tag: "ae2__formation_core",
        item_name: "Formation Core",
        mod_tag: "ae2",
        mod_name: "Applied Enegistics 2",
        type: "Item",
      },
      {
        item_tag: "minecraft__iron_ingot",
        item_name: "Iron Ingot",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Item",
      },
      {
        item_tag: "minecraft__crafting_table",
        item_name: "Crafting Table",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Block",
      },
      {
        item_tag: "minecraft__iron_ingot",
        item_name: "Iron Ingot",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Item",
      },
    ],
    crafting_products: [
      {
        item_tag: "ae2__pattern_provider",
        item_name: "Pattern Provider",
        mod_tag: "ae2",
        mod_name: "Applied Enegistics 2",
        type: "Block",
        count: 1,
      },
    ],
  },
];
const terra_pick: any = [
  {
    crafting_type: "minecraft_crafting",
    crafting_grid: [
      {
        item_tag: "botania__terrasteel_ingot",
        item_name: "Terrasteel",
        mod_tag: "botania",
        mod_name: "Botania",
        type: "Item",
      },
      {
        item_tag: "botania__mana_tablet",
        item_name: "Mana Tablet",
        mod_tag: "botania",
        mod_name: "Botania",
        type: "Item",
      },
      {
        item_tag: "botania__terrasteel_ingot",
        item_name: "Terrasteel",
        mod_tag: "botania",
        mod_name: "Botania",
        type: "Item",
      },
      {
        item_tag: "botania__terrasteel_ingot",
        item_name: "Terrasteel",
        mod_tag: "botania",
        mod_name: "Botania",
        type: "Item",
      },
      {
        item_tag: "botania__livingwood_twig",
        item_name: "Livingwood Twig",
        mod_tag: "minecraft",
        mod_name: "Botania",
        type: "Item",
      },
      {
        item_tag: "botania__terrasteel_ingot",
        item_name: "Terrasteel",
        mod_tag: "botania",
        mod_name: "Botania",
        type: "Item",
      },
      {
        item_tag: "minecraft__air",
        item_name: "Iron Ingot",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Item",
      },
      {
        item_tag: "botania__livingwood_twig",
        item_name: "Livingwood Twig",
        mod_tag: "botania",
        mod_name: "Botania",
        type: "Item",
      },
      {
        item_tag: "minecraft__air",
        item_name: "Iron Ingot",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Item",
      },
    ],
    crafting_products: [
      {
        item_tag: "botania__terra_pick",
        item_name: "Terra Shatterer",
        mod_tag: "botania",
        mod_name: "Botania",
        count: 1,
        type: "Tool",
      },
    ],
  },
];
const crafting: any = [
  {
    crafting_type: "minecraft_crafting",
    crafting_grid: [
      {
        item_tag: "minecraft__oak_planks",
        item_name: "Oak Planks",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Block",
      },
      {
        item_tag: "minecraft__oak_planks",
        item_name: "Oak Planks",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Block",
      },
      {
        item_tag: "minecraft__oak_planks",
        item_name: "Oak Planks",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Block",
      },
      {
        item_tag: "minecraft__oak_planks",
        item_name: "Oak Planks",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Block",
      },
    ],
    crafting_products: [
      {
        item_tag: "minecraft__crafting_table",
        item_name: "Crafting Table",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        count: 1,
        type: "Block",
      },
    ],
  },
];
const stick: any = [
  {
    crafting_type: "minecraft_crafting",
    crafting_grid: [
      {
        item_tag: "minecraft__oak_planks",
        item_name: "Stick",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Block",
      },
      {
        item_tag: "minecraft__air",
        item_name: "Air",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Block",
      },
      {
        item_tag: "minecraft__oak_planks",
        item_name: "Stick",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Block",
      },
      {
        item_tag: "minecraft__air",
        item_name: "Air",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        type: "Item",
      },
    ],
    crafting_products: [
      {
        item_tag: "minecraft__stick",
        item_name: "Stick",
        mod_tag: "minecraft",
        mod_name: "Minecraft",
        count: 4,
        type: "Item",
      },
    ],
  },
];

export default function Home() {
  
    useEffect(() => {
        connectMongo()
    })

  return (
    <main className="m-10" id="main">
      <h1 className="text-3xl text-white font-[700] mb-5">Crafting Test</h1>
      <div className="flex flex-wrap justify-center gap-10 border-[1px] border-[#464444] bg-transparent rounded-lg p-5">
        <CraftingBig crafting={furnace} />
        <CraftingBig crafting={pattern_provider} />
      </div>
      <div className="flex flex-wrap justify-center gap-10 border-[1px] border-[#464444] bg-transparent rounded-lg p-5 mt-5 mb-[200px]">
        <CraftingBig crafting={terra_pick} />
        <CraftingBig crafting={terra_pick} />
        <CraftingBig crafting={terra_pick} />
        <CraftingBig crafting={terra_pick} />
        <CraftingBig crafting={terra_pick} />
        <CraftingSmall crafting={crafting}></CraftingSmall>
        <CraftingSmall crafting={stick}></CraftingSmall>
      </div>
    </main>
  );
}
