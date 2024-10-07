'use client'
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
interface Props {
    shipId : string | string[] | undefined
    initId : string | string[] | undefined
    keyword : string
}
interface DataType {
    ID : string, thumnailFile : string, thumnailFilename : string,
    shipAssembleName : string, bopIdx : string , bopExist : boolean,
    createDate : string, modelingUrl : string, bopModelingUrl : string
}
export default function ShipAssembleBox ({ shipId , initId , keyword } : Props) {
    const router = useRouter()
    const path = usePathname()
    const query = useSearchParams()
    const [data , setData] = useState<DataType[]>([])
    function handleKeyword (e:any) {
        if(e.key === 'Enter'){
            const newParams = new URLSearchParams(query.toString())
            newParams.set('keyword', e.target.value)
            router.push(`${path}?${newParams?.toString()}`)
        }
    }
    async function getList () {
        const response = await api.get(`/admin/getShipAssembleListByShipType.php?shipTypeId=${shipId || initId}&assembleName=${keyword || ''}`)
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

    function handleBopModlingPage (e:React.MouseEvent, id : string , url : string, name : string , bopExist : boolean) {
        e.preventDefault()
        if(bopExist) {
            if(url){
                const modelingNameParts = url ? url.split('/') : [];
                let modelingNameLastPart = modelingNameParts.length > 0 ? modelingNameParts[modelingNameParts.length - 1] : '';
                modelingNameLastPart = modelingNameLastPart.replace('.html', '');
                router.push(`/ship-type/${id}?s=${shipId || initId}&t=bop&name=${name}&m=${modelingNameLastPart}`)
            }else{
                alert('등록된 모델링이 없습니다.');  return;
            }
        }else{
            alert('BOP 등록을 해주시기 바랍니다.')
        }
    }
    
    useEffect(() => {
        getList()
    }, [shipId, keyword])
    return(
        <>
            <section className="ship-type-bop">
                <div className="search-bar-area">
                    <div className="search-bar">
                        <input type="text" defaultValue={keyword} onKeyDown={(e) => handleKeyword(e)} maxLength={50}/>
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
                                        <p className={list?.bopExist ? 'registed' : 'no-registed'}>BOP <a href={'#'} onClick={(e) => handleBopModlingPage(e, list?.bopIdx, list?.bopModelingUrl, list?.shipAssembleName, list?.bopExist)}>수정</a></p>
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
