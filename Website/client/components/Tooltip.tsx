
import Image from "next/image";

interface ItemProps {
    itemstack?: any
    className?: string
}

export const Tooltip = ({itemstack, className}: ItemProps) => {
    return (
        <div>
            <div className={className + " w-[300px] h-[300px] scale-100 hidden group-hover:block absolute top-20 left-0 z-10 transition duration-400 group-hover:translate-y-5 animate-in"}>
            <div className='w-[auto] h-[auto] bg-[#16181c] border-white border-[3px] p-5 rounded-lg overflow-auto'>
                        <div className='flex gap-4 items-center mb-5'>
                            <Image width={30} height={30} src={`http://localhost:3005/images/icon/${itemstack.item_tag}/false`} alt='item-icon' className='image w-10 h-10 relative'></Image>
                            <div>
                                <h1 className={`text-md font-[800] text-white`}>{itemstack.item_name}</h1>
                                <p className='text-gray-200 text-sm font-[600]'>{itemstack.type}</p>
                            </div>
                        </div>

                        <div>
                            
                        </div>
                    
                        <p className='text-blue-500'>{itemstack.mod_name}</p>
                    </div>
            </div>
        </div>
    )
}