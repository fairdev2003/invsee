'use client'

import Image from "next/image";
import { Tooltip } from "./Tooltip";

interface ItemProps {
    itemstack?: any
    count?: number
    blocked?: boolean
    width?: number,
    height?: number
}

export const ItemStack = ({itemstack, count, blocked, width, height}: ItemProps) => {

    const handleDeafultImage = (event: any) => {
        event.target.src = 'deafult.png';
      }

    

    return (
        <div className={`group bg-transparent border-[3px] border-[#464444] rounded-lg w-[${width ? width : 75}px] h-[${height ? height : 75}px] flex justify-center items-center relative z-2 ${itemstack.item_tag && itemstack.item_tag != "minecraft__air" ?"cursor-pointer hover:border-white transition-colors" : null}`}>
            {itemstack.item_tag && itemstack.item_tag != "minecraft__air" ? <Image width={width ? width * 0.9 : 50} height={height ? height * 0.9 : 50} alt='item_stack' src={`http://localhost:3005/images/icon/${itemstack.item_tag}/false`} className="" onError={(event) => {handleDeafultImage(event)}}></Image> : null}
            {count && count > 1 ? <p className="absolute z-2 bottom-1 right-3 text-lg text-white font-[600]">{count}</p> : null}
            {itemstack.item_tag && itemstack.item_tag != "minecraft__air" && !blocked ? <Tooltip itemstack={itemstack}/> : null}
        </div>
    )
}