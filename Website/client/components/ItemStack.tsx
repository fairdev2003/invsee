
import Image from "next/image";

interface ItemProps {
    item_tag?: string
    count?: number 
}

export const ItemStack = ({item_tag, count}: ItemProps) => {
    return (
        <div className="bg-transparent border-[1px] border-[#464444] rounded-lg w-[75px] h-[75px] flex justify-center items-center relative">
            {item_tag && item_tag != "minecraft__air" ? <Image width={50} height={50} alt='item_stack' src={`http://localhost:3005/images/icon/${item_tag}/false`} className=""></Image> : null}
            {count ? <p className="absolute bottom-1 right-3 text-lg text-white font-[600]">{count}</p> : null}
        </div>
    )
}