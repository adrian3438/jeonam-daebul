'use client'
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
interface Props {
    shipId : string | string[] | undefined
    initId : string | string[] | undefined
}
interface DataType {
    ID : string | Blob, thumnailFile : string, thumnailFilename : string,
    shipAssembleName : string, bopIdx : string | number , bopExist : boolean,
    createDate : string
}
export default function ShipAssembleBox ({ shipId , initId } : Props) {
    const router = useRouter()
    const [data , setData] = useState<DataType[]>([])
    function isBop (bopExist : boolean) {
        if(!bopExist) {alert('BOP 등록을 해주시기 바랍니다.'); return;}
    }
    async function getList () {
        const response = await api.get(`/admin/getShipAssembleListByShipType.php?shipTypeId=${shipId || initId}`)
        if(response?.data?.result === true) {
            setData(response?.data?.List)
        }
    }
    useEffect(() => {
        getList()
    }, [shipId])
    return(
        <>
        <section className="ship-type-bop">
            <ul>
                {data?.map((list:DataType,index:number) => (
                    <li key={index}>
                        <div>
                            <div className="bop-image-area">
                                <Image src={list?.thumnailFile ? list?.thumnailFile : '/images/no-image.jpg'} onClick={()=>router.push(`/ship-type/${list?.ID}?t=assemble&m=FGSS`)} alt="sample" width={500} height={322}/>
                            </div>
                            <div className="bop-info-area">
                                <p>{list?.shipAssembleName}</p>
                                <p className={list?.bopExist ? 'registed' : 'no-registed'}>BOP <Link href={list?.bopExist ? `/ship-type/${list?.bopIdx}?t=bop&m=FGSS` : '#'} onClick={()=>isBop(list?.bopExist)}>수정</Link></p>
                            </div>
                        </div>
                    </li>
                ))}
                {/* <li>
                    <div>
                        <div className="bop-image-area">
                            이미지 영역
                        </div>
                        <div className="bop-info-area">
                            <p>S11C</p>
                            <p className="no-registed">BOP <Link href="#">등록</Link></p>
                        </div>
                    </div>
                </li> */}
            </ul>
        </section>
        </>
    )
}
