
import Image from "next/image";
import { Tooltip } from "./Tooltip";

interface ItemProps {
    itemstack?: any
    count?: number
    blocked?: boolean
}

export const ItemStack = ({itemstack, count, blocked}: ItemProps) => {

    const handleDeafultImage = (event: any) => {
        event.target.src = 'deafult.png';
      }

    return (
        <div className={`group bg-transparent border-[3px] border-[#464444] rounded-lg w-[75px] h-[75px] flex justify-center items-center relative z-2 top-0 bottom-0 left-0 right-0 ${itemstack.item_tag && itemstack.item_tag != "minecraft__air" ?"cursor-pointer hover:border-white transition-colors" : null}`}>
            {itemstack.item_tag && itemstack.item_tag != "minecraft__air" ? <Image width={50} height={50} alt='item_stack' src={`http://localhost:3005/images/icon/${itemstack.item_tag}/false`} className="" onError={(event) => {handleDeafultImage(event)}}></Image> : null}
            {count && count > 1 ? <p className="absolute z-2 bottom-1 right-3 text-lg text-white font-[600]">{count}</p> : null}
            {itemstack.item_tag && itemstack.item_tag != "minecraft__air" && !blocked ? <Tooltip itemstack={itemstack}/> : null}
        </div>
    )
}