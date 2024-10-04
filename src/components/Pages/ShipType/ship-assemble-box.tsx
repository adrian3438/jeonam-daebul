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
    ID : string, thumnailFile : string, thumnailFilename : string,
    shipAssembleName : string, bopIdx : string | number , bopExist : boolean,
    createDate : string, modelingUrl : string
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
    function handleModlingPage (id : string , url : string, name : string) {
        if(url){
            const modelingNameParts = url ? url.split('/') : [];
            let modelingNameLastPart = modelingNameParts.length > 0 ? modelingNameParts[modelingNameParts.length - 1] : '';
            modelingNameLastPart = modelingNameLastPart.replace('.html', '');
            router.push(`/ship-type/${id}?s=${shipId || initId}&t=assemble&name=${name}&m=${modelingNameLastPart}`)
        }else{
            alert('등록된 모델링이 없습니다.');  return;
        }
    }
    useEffect(() => {
        getList()
    }, [shipId])
    return(
        <>
            <section className="ship-type-bop">
                <div className="search-bar-area">
                    <div className="search-bar">
                        <input type="text" maxLength={50}/>
                        <input type="button" className="search-btn"/>
                    </div>
                </div>
                <ul>
                    {data?.map((list: DataType, index: number) => {
                        const modelingNameParts = list?.modelingUrl ? list?.modelingUrl.split('/') : [];
                        let modelingNameLastPart = modelingNameParts.length > 0 ? modelingNameParts[modelingNameParts.length - 1] : '';
                        modelingNameLastPart = modelingNameLastPart.replace('.html', '');
                        return (
                            <li key={index}>
                                <div>
                                    <div className="bop-image-area">
                                        <Image src={list?.thumnailFile ? list?.thumnailFile : '/images/no-image.jpg'} onClick={() => handleModlingPage(list?.ID, list?.modelingUrl, list?.shipAssembleName)} alt="sample" width={500} height={322}/>
                                    </div>
                                    <div className="bop-info-area">
                                        <p>{list?.shipAssembleName}</p>
                                        <p className={list?.bopExist ? 'registed' : 'no-registed'}>BOP <Link href={list?.bopExist ? `/ship-type/${list?.bopIdx}?t=bop&m=${modelingNameLastPart}` : '#'} onClick={() => isBop(list?.bopExist)}>수정</Link></p>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
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
