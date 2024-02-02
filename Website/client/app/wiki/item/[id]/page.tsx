'use client'

import { FetchSingleItem } from "@/lib/SingleItemFetch";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import SliderMenu from "@/components/SliderMenu";
import Content from "@/components/crafting_components/Content";

const Page = ({ params }: { params: { id: string } }) => {


    const [item_data, setitem_data]: any = useState(null);

    
    const fetch_item = async (id: string) => {
        try {
            const response: any = await axios.post(`/api/items/single`, {tag_name: id});
            
            setTimeout(() => {
                setitem_data(response.data);
            }, 1000)
            
        } catch (error) {
            console.error("Error fetching item:", error);
        }
    };

    
    useEffect(() => {
        
        fetch_item(params.id);
        console.log(item_data)
    }, [params.id]); 

    return (
        <section className="flex justify-center mb-10">
            
            {item_data && item_data.length > 0 ? <div>
                
                <div className="flex gap-3">
                    <div className="w-1/3 bg-[#26292f] rounded-lg flex justify-center items-center p-10">
                        <Image alt='item_image' width={150} height={150} src={`http://localhost:3005/images/icon/${item_data[0].tag_name}/false`}></Image>   
                    </div>
                    <div className="w-[1000px] rounded-lg p-10 bg-[#26292f]">
                        <header className="mb-10">
                            <h1 className="text-blue-500 font-[600] text-3xl">Botania <span className="text-white">|</span> {item_data[0].item_name}</h1>
                        </header>
                        <div className="flex gap-3">

                        </div>
                    </div>
                </div>
                
                <div className="h-[1000px] w-auto bg-[#26292f] mt-5 p-10 rounded-lg">
                     <SliderMenu item_tag={item_data[0].tag_name}></SliderMenu>
                     <Content></Content>
                </div>

            </div> : <div className="flex flex-col justify-center items-center gap-3">
                <span className="loader"></span>
                <p className="text-white font-[600]">Loading Items</p>
                </div>}
        </section>
    )
}

export default Page;