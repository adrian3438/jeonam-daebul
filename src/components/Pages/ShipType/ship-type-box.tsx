'use client'
import api from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface ShipType {
    ID : number | string , thumnailFile : string, thumnailFilename : string , shipTypeName : string, activeStatus : string, createDate : string
}
interface Props { shipid : string | undefined }
export default function ShipTypeBox ({shipid} : Props) {
    const router = useRouter()
    const [data , setData] = useState<ShipType[]>([])
    function SelectShip (id : string) {
        router.push(`/ship-type?s=${id}`)
    }
    async function getList () {
        const response = await api.get(`/admin/getAdminMainDashBoard.php?shipAssembleName=`)
        if(response?.data?.result === true) {
            setData(response?.data?.List)
        }
    }
    useEffect(()=> {
        getList()
    }, [])
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
