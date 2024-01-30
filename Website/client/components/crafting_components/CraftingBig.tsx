import { ItemStack } from "../ItemStack"
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";
import { useEffect } from "react";

interface Props {
    crafting: any,
    final_item: string
    count?: any
}

export const CraftingBig = ({crafting, final_item, count} : Props) => {

    useEffect(() => {
        console.log(crafting)
    }, [])

    return (
        <section className="border-[3px] border-[#464444] bg-transparent rounded-lg mt-5">
            <div className="flex gap-3 items-center m-5 my-3">
                <Image alt="crafting" src='http://localhost:3005/images/icon/minecraft__crafting_table/false' width={40} height={40}/>
                <h1 className="text-white text-xl font-[600]">Crafting Recipe</h1>
                    
            </div>
            <div className="w-full h-[1px] bg-[#464444] my-2"></div>
            
            <div className="flex items-center gap-5 m-5">
                <div className="flex flex-col gap-2">
                    
                    <div className="flex flex-wrap gap-2">
                        <ItemStack itemstack={crafting[0].crafting_grid[0]}></ItemStack>
                        <ItemStack itemstack={crafting[0].crafting_grid[1]}></ItemStack>
                        <ItemStack itemstack={crafting[0].crafting_grid[2]}></ItemStack>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <ItemStack itemstack={crafting[0].crafting_grid[3]}></ItemStack>
                        <ItemStack itemstack={crafting[0].crafting_grid[4]}></ItemStack>
                        <ItemStack itemstack={crafting[0].crafting_grid[5]}></ItemStack>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <ItemStack itemstack={crafting[0].crafting_grid[6]}></ItemStack>
                        <ItemStack itemstack={crafting[0].crafting_grid[7]}></ItemStack>
                        <ItemStack itemstack={crafting[0].crafting_grid[8]}></ItemStack>
                    </div>
                    
                </div>
                <span className="text-[40px] text-white"><FaArrowRightLong/></span>
                <ItemStack itemstack={crafting[0].crafting_products[0]} count={crafting[0].crafting_products[0].count}/>
            </div>
            
        </section>
    )
}