"use client"

import { CraftingBig } from '@/components/crafting_components/CraftingBig'
import { CraftingSmall } from '@/components/crafting_components/CraftingSmall'
import Navbar from '@/components/navbar'
import { useEffect, useState } from 'react'

export default function Home() {

    const [loaded, setloaded] = useState(false)
  
    useEffect(() => {

    })

  return (
    <main className=''>
      <div className='flex flex-wrap justify-center gap-10 m-10 border-[1px] border-[#464444] bg-transparent rounded-lg p-5'>
        <CraftingBig crafting={[
            "minecraft__cobblestone",
            "minecraft__cobblestone",
            "minecraft__cobblestone",
            "minecraft__cobblestone",
            "minecraft__air",
            "minecraft__cobblestone",
            "minecraft__cobblestone",
            "minecraft__cobblestone",
            "minecraft__cobblestone",
        ]} final_item='minecraft__furnace'/>
        <CraftingBig crafting={[
            "minecraft__oak_planks",
            "minecraft__oak_planks",
            "minecraft__oak_planks",
            "minecraft__oak_planks",
            "minecraft__air",
            "minecraft__oak_planks",
            "minecraft__oak_planks",
            "minecraft__oak_planks",
            "minecraft__oak_planks",
        ]} final_item='minecraft__chest'/>
        <CraftingBig crafting={[
            "minecraft__oak_log",
            "minecraft__oak_log",
            "minecraft__oak_log",
            "minecraft__oak_log",
            "minecraft__air",
            "minecraft__oak_log",
            "minecraft__oak_log",
            "minecraft__oak_log",
            "minecraft__oak_log",
        ]} final_item='minecraft__chest' count={4}/>
        <CraftingBig crafting={[
            "minecraft__air",
            "minecraft__oak_log",
            "minecraft__air",
            "minecraft__oak_log",
            "minecraft__furnace",
            "minecraft__oak_log",
            "minecraft__air",
            "minecraft__oak_log",
            "minecraft__air",
        ]} final_item='minecraft__smoker'/>
        <CraftingBig crafting={[
            "minecraft__smooth_stone",
            "minecraft__smooth_stone",
            "minecraft__smooth_stone",
            "minecraft__smooth_stone",
            "minecraft__furnace",
            "minecraft__smooth_stone",
            "minecraft__iron_ingot",
            "minecraft__iron_ingot",
            "minecraft__iron_ingot",
        ]} final_item='minecraft__blast_furnace'/>
        <CraftingBig crafting={[
            "minecraft__air",
            "minecraft__book",
            "minecraft__air",
            "minecraft__diamond",
            "minecraft__obsidian",
            "minecraft__diamond",
            "minecraft__obsidian",
            "minecraft__obsidian",
            "minecraft__obsidian",
        ]} final_item='minecraft__enchanting_table'/>
        <CraftingBig crafting={[
            "minecraft__iron_ingot",
            "minecraft__iron_ingot",
            "minecraft__air",
            "minecraft__oak_planks",
            "minecraft__oak_planks",
            "minecraft__air",
            "minecraft__oak_planks",
            "minecraft__oak_planks",
            "minecraft__air",
        ]} final_item='minecraft__smithing_table'/>
        <CraftingBig crafting={[
            "minecraft__iron_ingot",
            "minecraft__iron_ingot",
            "minecraft__iron_ingot",
            "minecraft__air",
            "minecraft__iron_block",
            "minecraft__air",
            "minecraft__iron_block",
            "minecraft__iron_block",
            "minecraft__iron_block",
        ]} final_item='minecraft__anvil'/>
        <CraftingBig crafting={[
            "minecraft__stick",
            "minecraft__stone_slab",
            "minecraft__stick",
            "minecraft__oak_planks",
            "minecraft__air",
            "minecraft__oak_planks",
            "minecraft__air",
            "minecraft__air",
            "minecraft__air",
        ]} final_item='minecraft__grindstone'/>
        </div>
        <div className='flex flex-wrap justify-center gap-10 m-10 border-[1px] border-[#464444] bg-transparent rounded-lg p-5'>
            <CraftingSmall crafting={[
                "minecraft__oak_planks",
                "minecraft__oak_planks",
                "minecraft__oak_planks",
                "minecraft__oak_planks"
            ]} final_item='minecraft__crafting_table'/>
            <CraftingSmall crafting={[
                "minecraft__oak_log",
                "minecraft__air",
                "minecraft__air",
                "minecraft__air"
            ]} final_item='minecraft__oak_planks' count={4}/>
            <CraftingSmall crafting={[
                "minecraft__poppy",
                "minecraft__air",
                "minecraft__air",
                "minecraft__air"
            ]} final_item='minecraft__red_dye'/>
            <CraftingSmall crafting={[
                "minecraft__rose_bush",
                "minecraft__air",
                "minecraft__air",
                "minecraft__air"
            ]} final_item='minecraft__red_dye' count={2}/>
            <CraftingSmall crafting={[
                "minecraft__red_tulip",
                "minecraft__air",
                "minecraft__air",
                "minecraft__air"
            ]} final_item='minecraft__red_dye'/>
            <CraftingSmall crafting={[
                "minecraft__oak_planks",
                "minecraft__air",
                "minecraft__oak_planks",
                "minecraft__air"
            ]} final_item='minecraft__stick' count={4}/>
            <CraftingSmall crafting={[
                "minecraft__oak_log",
                "minecraft__air",
                "minecraft__oak_log",
                "minecraft__air"
            ]} final_item='minecraft__stick' count={16}/>
        </div>
        <div className='flex flex-wrap justify-center gap-10 m-10 border-[1px] border-[#464444] bg-transparent rounded-lg p-5'>
            <CraftingBig crafting={[
                "ae2__quartz_glass",
                "minecraft__redstone",
                "ae2__quartz_glass",
                "minecraft__redstone",
                "ae2__cell_component_1k",
                "minecraft__redstone",
                "minecraft__iron_ingot",
                "minecraft__iron_ingot",
                "minecraft__iron_ingot",
            ]} final_item='ae2__item_storage_cell_1k'/>
            <CraftingBig crafting={[
                "ae2__quartz_glass",
                "minecraft__redstone",
                "ae2__quartz_glass",
                "minecraft__redstone",
                "ae2__cell_component_4k",
                "minecraft__redstone",
                "minecraft__iron_ingot",
                "minecraft__iron_ingot",
                "minecraft__iron_ingot",
            ]} final_item='ae2__item_storage_cell_4k'/>
            <CraftingBig crafting={[
                "ae2__quartz_glass",
                "minecraft__redstone",
                "ae2__quartz_glass",
                "minecraft__redstone",
                "ae2__cell_component_16k",
                "minecraft__redstone",
                "minecraft__iron_ingot",
                "minecraft__iron_ingot",
                "minecraft__iron_ingot",
            ]} final_item='ae2__item_storage_cell_16k'/>
            <CraftingBig crafting={[
                "ae2__quartz_glass",
                "minecraft__redstone",
                "ae2__quartz_glass",
                "minecraft__redstone",
                "ae2__cell_component_64k",
                "minecraft__redstone",
                "minecraft__iron_ingot",
                "minecraft__iron_ingot",
                "minecraft__iron_ingot",
            ]} final_item='ae2__item_storage_cell_64k'/>
            <CraftingBig crafting={[
                "ae2__quartz_glass",
                "minecraft__redstone",
                "ae2__quartz_glass",
                "minecraft__redstone",
                "ae2__cell_component_256k",
                "minecraft__redstone",
                "minecraft__iron_ingot",
                "minecraft__iron_ingot",
                "minecraft__iron_ingot",
            ]} final_item='ae2__item_storage_cell_256k'/>
            <CraftingBig crafting={[
                "ae2__smooth_sky_stone_block",
                "ae2__fluix_crystal",
                "ae2__smooth_sky_stone_block",
                "ae2__fluix_crystal",
                "ae2__engineering_processor",
                "ae2__fluix_crystal",
                "ae2__smooth_sky_stone_block",
                "ae2__fluix_crystal",
                "ae2__smooth_sky_stone_block",
            ]} final_item='ae2__controller'/>
            <CraftingBig crafting={[
                "minecraft__iron_ingot",
                "ae2__engineering_processor",
                "minecraft__iron_ingot",
                "ae2__fluix_glass_cable",
                "minecraft__air",
                "ae2__fluix_glass_cable",
                "minecraft__iron_ingot",
                "ae2__engineering_processor",
                "minecraft__iron_ingot",
            ]} final_item='ae2__drive'/>
            <CraftingBig crafting={[
                "minecraft__iron_ingot",
                "minecraft__crafting_table",
                "minecraft__iron_ingot",
                "ae2__annihilation_core",
                "minecraft__air",
                "ae2__formation_core",
                "minecraft__iron_ingot",
                "minecraft__crafting_table",
                "minecraft__iron_ingot",
            ]} final_item='ae2__pattern_provider'/>
        </div>
      
    </main>
  )
}