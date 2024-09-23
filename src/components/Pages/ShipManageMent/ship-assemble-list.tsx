'use client'
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
interface DataType {
    ID : string | Blob, thumnailFile : string, thumnailFilename : string, shipAssembleName : string,
    activeStatus : string, createDate : string, bopExist : boolean, bopIdx : string | Blob
}
interface Props {
    id : string | Blob
    list : DataType[]
}
export default function ShipAssembleListBox ({
    id, list
} : Props) {
    const [data, setData] = useState<DataType[]>(list)
    async function getList () {
        const response = await api.get(`/admin/setup/getShipAssembleList.php?shipTypeId=${id}`)
        if(response?.data?.result === true) {
            setData(response?.data?.List)
        }
    }
    useEffect(() => {
        getList()
    }, [])
    return(
        <>
        <section className="ship-bop-manage-list">
            <ul>
                {data?.map((list:DataType , index : number) => (
                    <li key={index}>
                        <div>
                            <div className="bop-image-area">
                                <Image src={list?.thumnailFile ? list?.thumnailFile : '/images/no-image.jpg'} alt="sample" width={100} height={100}/>
                            </div>
                            <div className="bop-info-area">
                                <p className="subsidary-regist">{list?.shipAssembleName} <Link href="/ship-manage/1/regist-subsidary">수정</Link></p>
                                <p className={list?.bopExist ? 'registed' : 'no-registed'}>BOP <Link href={list?.bopExist ? `/ship-manage/1/bop/${list?.bopIdx}` : `/ship-manage/1/bop/regist`}>수정</Link></p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>

        <div className="pagination">
            <div className='btns'>
                <Link href="/ship-manage/1/regist-subsidary">등록</Link>
            </div>
        </div>
        </>
    )
}