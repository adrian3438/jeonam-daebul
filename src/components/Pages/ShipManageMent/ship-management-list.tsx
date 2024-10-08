'use client'
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
interface Props {
    list : []
    keyword : string | undefined
}
interface DataType {
    ID : number, activeStatus : string, createDate : string,
    shipTypeName : string, thumnailFile : string, thumnailFilename : string
}
export default function ShipManagementListBox ({list, keyword} : Props) {
    const router = useRouter()
    const path = usePathname()
    const query = useSearchParams()
    const [data, setData] = useState<[]>(list)
    async function getList () {
        const response = await api.get(`/admin/setup/getShipTypeList.php?shipTypeName=${keyword || ''}`)
        if(response?.data?.result === true) {
            if(response?.data?.List?.length > 0){
                setData(response?.data?.List);
            }else{setData([])}
        }
    }
    function SearchKeyword (e:any) {
        if(e.key === 'Enter') {
            const newParams = new URLSearchParams(query.toString())
            newParams.set('keyword', e.target.value)
            router.push(`${path}?${newParams?.toString()}`)
        }
    }
    useEffect(() => {
        getList()
    }, [keyword])
    return(
        <>
            <div className="search-bar-area2">
                <div className='btns'>
                    <Link href="/ship-manage/regist?id=0">등록</Link>
                </div>
                <div className="search-bar">
                    <input type="text" onKeyDown={(e) => SearchKeyword(e)} defaultValue={keyword} maxLength={50}/>
                    <input type="button" className="search-btn"/>
                </div>
            </div>
            <div className="ship-manage-list">
                <ul>
                    {data?.map((list: DataType, index: number) => (
                        <li className="active" key={index}>
                            <button>
                                <Link href={`/ship-manage/${list?.ID}`}>
                                <Image src={list?.thumnailFile ? list?.thumnailFile : '/images/no-image.jpg'} alt="sample" width={373} height={280}/>
                                </Link>
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
        </>
    )
}
