import { ItemStack } from "../ItemStack"
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";
import { cn } from "@/lib/utils";
import './crafting.css'

interface Props {
    crafting: any,
    count?: any
    className?: string
}

export const CraftingSmall = ({crafting, count, className} : Props) => {



    return (
        <section className={`border-[3px] border-[#464444] bg-transparent rounded-lg mt-5`}>
            <div className="flex gap-3 items-center m-5 my-3">
                <Image alt="crafting" src='http://localhost:3005/images/icon/minecraft__crafting_table/false' width={40} height={40}/>
                <h1 className="text-white text-xl font-[600]">Crafting Recipe</h1>
                    
            </div>
            <div className="w-full h-[1px] bg-[#464444] my-2"></div>
            
            <div className="flex items-center gap-5 m-5 justify-center">
                <div className="flex flex-col gap-2">
                    
                    <div className="flex flex-wrap gap-2">
                        <ItemStack itemstack={crafting[0].crafting_grid[0]}></ItemStack>
                        <ItemStack itemstack={crafting[0].crafting_grid[1]}></ItemStack>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <ItemStack itemstack={crafting[0].crafting_grid[2]}></ItemStack>
                        <ItemStack itemstack={crafting[0].crafting_grid[3]}></ItemStack>
                    </div>
                    
                </div>
                <span className="text-[40px] text-white"><FaArrowRightLong><FaArrowRightLong id="loader"></FaArrowRightLong></FaArrowRightLong></span>
                <ItemStack itemstack={crafting[0].crafting_products[0]} count={crafting[0].crafting_products[0].count}/>
            </div>
            
        </section>
    )
}