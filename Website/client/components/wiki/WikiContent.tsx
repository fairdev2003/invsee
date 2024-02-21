'use client'

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import SliderMenu from "../SliderMenu";

interface WikiContentProps {
  data: any
  className?: string
}

export default function WikiContent({ data, className }: WikiContentProps) {
    


    return (
        <section>
            <SliderMenu item_tag={data.tag_name}></SliderMenu>
            
        </section>
    )
}