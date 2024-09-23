'use client'
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface Props {
    list : []
}
interface DataType {
    ID : number, activeStatus : string, createDate : string,
    shipTypeName : string, thumnailFile : string, thumnailFilename : string
}
export default function ShipManagementListBox ({list} : Props) {
    const router = useRouter()
    const [data, setData] = useState<[]>(list)
    async function getList () {
        const response = await api.get(`/admin/setup/getShipTypeList.php?shipTypeName=`)
        if(response?.data?.result === true) {
            if(response?.data?.List?.length > 0){
                setData(response?.data?.List);
            }else{setData([])}
        }
    }
    useEffect(() => {
        getList()
    }, [])
    return(
        <>
         <div className="ship-manage-list">
            <ul>
                {data?.map((list:DataType, index:number) => (
                    <li className="active" key={index}>
                        <button>
                            <Image src={list?.thumnailFile ? list?.thumnailFile : '/images/no-image.jpg'} alt="sample" width={50} height={50}/>
                        </button>
                        <div>
                            <p>{list?.shipTypeName}</p>
                            <div>
                                <Link href={`/ship-manage/${list?.ID}`}><Image src="/images/manage.svg" alt="수정" width={20} height={20}/></Link>
                                <Link href={`/ship-manage/regist?id=${list?.ID}`}><Image src="/images/write.svg" alt="수정" width={20} height={20}/></Link>
                            </div>
                        </div>
                    </li>
                ))}
                
            </ul>
        </div>

        <div className="pagination">
            <div className='btns'>
                <Link href="/ship-manage/regist?id=0">등록</Link>
            </div>
        </div>
        </>
    )
}