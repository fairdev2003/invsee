'use client'

import { Button } from "@/components/ui/button"
import { trpc } from "../_trpc/client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Media from "@/components/Media"
import type { Item } from "@prisma/client"


class Siema {
    public email
    protected name
    protected phone_number

    constructor(email: string, name: string, phone_number: number) {
        this.email = email
        this.name = email
        this.phone_number = phone_number
    }

    public print_email = () => {
        console.log("Printing email", this.email)
    }
    public print_name = () => {
        console.log("Printing email", this.email)
    }
    public print_phone = () => {
        console.log("Printing email", this.phone_number)
    }
    
}

const siema = new Siema("kubaklimkiewciz1@gmail.com", "Jakub", 576772101).print_name()




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
                        
                        <div>
                            <p className="text-white">{JSON.stringify(item)}</p>
                            <div className="text-white p-5 flex-col bg-gray-700 rounded-lg w-[1000px] flex items-center gap-20">
                                    <Image width={256} height={256} alt={item.id} src={`https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/${item.mod.tag}/${item.item_tag}`}></Image>
                                    <p>[{" "}<span className="text-blue-500 font-bold">{ item.mod.modName }</span>{" "}] {item.item_name}</p>
                                    { item.gallery.map((image: any) => {
                                        return (
                                            <div>
                                                <Image width={700} height={700} alt={image.authorId} src={image.image_src}></Image>
                                                <h1 className="text-white m-5">{ image?.title }</h1>
                                            </div>)
                                    }) }
                            </div>
                            
                        </div>
                        
                    )
                })}
            </div>
            <Media src="https://res.cloudinary.com/dzaslaxhw/video/upload/v1711740515/destroyme.mp3" size="large" type='music'/>
        </div>
    )


}

export default TestTRPC