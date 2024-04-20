import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

interface ItemCardProps {
    itemTag: string;
    itemName: string;
    ImageSrc: string;
    type: any;
}

const ItemCard = ({
    itemTag,
    itemName,
    ImageSrc,
    type
} : ItemCardProps) => {

    const params = useParams();
    const router = useRouter();
    

    return (
        <div onClick={() => {
            router.push(`/mods/${params?.tag}/${itemTag}`)
        }} className={`${params?.item_tag !== itemTag ? "bg-[#252222]" : "bg-green-500/10"} rounded-xl p-3 flex items-center gap-x-2 cursor-pointer`}>
            <Image src={ImageSrc} height={40} width={40} alt={itemTag}/>
            <div className=''>
                <h1>{itemName}</h1>
                <p className='text-sm text-blue-500'>{type}</p>
            </div>
        </div>
    )
}

export { ItemCard }