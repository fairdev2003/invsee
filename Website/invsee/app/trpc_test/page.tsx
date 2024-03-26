'use client'

import { Button } from "@/components/ui/button"
import { trpc } from "../_trpc/client"
import { useEffect, useState } from "react"
import Image from "next/image"


const TestTRPC = () => {

    const [message, setMessage] = useState<string>("")

    const item_data = trpc.items.get_all.useQuery()

    const addItem = trpc.items.createNewItem.useMutation({
        onSettled: () => {
            item_data.refetch()
            setMessage("Item Added")

            setTimeout(() => {
                setMessage("")
            }, 3000)
        }
    })

    function addItemFunc() {
        addItem.mutate({
            authorId: "65fef89de717dc8d698cd601",
            item_name: "1k Crafting Storage",
            modId: "6601b0a5cb8348f95d7f9789",
            item_tag: "ae2__1k_crafting_storage",
            stack_size: 64,
            type: "Block",
            short_description: "Crafting storage with 1k"
        })
    }
    
    return (
        
        <div className='flex flex-col justify-center items-center'>
            
            <p className="text-green-500">{message.length > 0 && message}</p>
            <Button onClick={addItemFunc} className="w-[200px] flex justify-center">Add item</Button>

            <div className="flex flex-col justify-center items-center gap-2 mt-5 mb-5">
                {item_data.data?.data.map((item: any) => {
                    return (
                        <div className="text-white p-5 bg-gray-700 rounded-lg w-[1000px] flex items-center gap-20">
                            <Image width={256} height={256} alt={item.id} src={`https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/${item.mod.tag}/${item.item_tag}`}></Image>
                            <p>[{" "}<span className="text-blue-500 font-bold">{item.mod.modName}</span>{" "}] {item.item_name}</p>
                        </div>
                        
                    )
                })}
            </div>
        </div>
    )


}

export default TestTRPC