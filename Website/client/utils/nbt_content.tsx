'use_client'

export const NbtContent = ( mod: string, item_data: any, color: string ) => {
    
    if (mod == "botania") {

            return (
                <div >
                    
                    <div className="">
                        {"mana" in item_data.nbt_data && item_data.display_name === "Terra Shatterer" ? <div>
                            <p style={{color: color}}>{Tier_Check(item_data).grade} Tier</p>
                        </div> : null}
                        

                        {item_data.display_name === "Band of Mana" || item_data.display_name === "Greater Band of Mana" || item_data.display_name === "Mana Tablet" || item_data.display_name === "Terra Shatterer" ? <div className="mb-5">

                            <p className="text-blue-500">Mana:</p>
                            
                            <div style={{backgroundColor: "rgb(191 219 254 / 1"}} className="w-[100%] h-[10px] rounded-lg"><div style={{backgroundColor: "rgb(59 130 246 / 1", width: `${Math.floor((item_data.nbt_data.mana / Tier_Check(item_data).max_mana) * 100)}%`, height: "10px"}} className="w-[auto] h-[auto] bg-[red] rounded-lg">
                            
                        </div></div></div> : null}
                    </div>
                </div>
            )
        
    } else {
        return null
    }

}

const Tier_Check: any = ( item_data: any ) => {
    if (item_data.display_name === "Terra Shatterer") {
        if (item_data.nbt_data.mana <= 9999) {
            const object = {
                grade: "D",
                max_mana: 10000
            }

            return object
        }
        if ( item_data.nbt_data.mana <= 999999 ) {
            const object = {
                grade: "C",
                max_mana: 100000
            }

            return object
        }
        if ( item_data.nbt_data.mana <= 9999999 ) {
            const object = {
                grade: "B",
                max_mana: 1000000
            }

            return object
        }
        if ( item_data.nbt_data.mana <= 99999999 ) {
            const object = {
                grade: "A",
                max_mana: 10000000
            }

            return object
        }
        if ( item_data.nbt_data.mana <= 999999999 ) {
            const object = {
                grade: "S",
                max_mana: 100000000
            }

            return object
        }
        if (item_data.nbt_data.mana >= 100000000 ) {
            const object = {
                grade: "SS",
                max_mana: "∞"
            }

            return object
        }
    } if (item_data.display_name === "Band of Mana") {
        const object = {
            grade: "SS",
            max_mana: "500000"
        }

        return object
    } if (item_data.display_name === "Greater Band of Mana") {
        const object = {
            grade: "SS",
            max_mana: "2000000"
        }

        return object
    } if (item_data.display_name === "Mana Tablet") {
        const object = {
            grade: "SS",
            max_mana: "500000"
        }
        return object
    }
}