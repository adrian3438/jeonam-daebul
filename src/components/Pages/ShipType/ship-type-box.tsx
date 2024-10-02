'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
interface ShipType {
    ID : number | string , thumnailFile : string, thumnailFilename : string , shipTypeName : string, activeStatus : string, createDate : string
}
interface Props { data : [], shipid : string | undefined }
export default function ShipTypeBox ({data, shipid} : Props) {
    const router = useRouter()
    function SelectShip (id : string) {
        router.push(`/ship-type?s=${id}`)
    }
    return(
        <>
        <section className="ship-type">
            <ul>
                {data?.map((list : ShipType, index : number) => (
                <li
                    key={index}
                    className={shipid === list?.ID.toString() ? 'active' : ''}
                    onClick={() => SelectShip(list?.ID?.toString())}
                >
                    <button>
                        <Image src={list?.thumnailFile ? list?.thumnailFile : '/images/no-image.jpg'} alt="sample" width={264} height={198}/>
                    </button>
                    <p>{list?.shipTypeName}</p>
                </li>
                ))}
            </ul>
        </section>
        </>
    )
}
