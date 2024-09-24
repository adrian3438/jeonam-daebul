'use client' 
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Props {
    data : DataType[]
}
interface DataType {
    ID : string | Blob, thumnailFile : string, thumnailFilename : string,
    shipAssembleName : string, bopIdx : string | number , bopExist : boolean,
    createDate : string
}
export default function ShipAssembleBox ({data} : Props) {
    const router = useRouter()
    function isBop (bopExist : boolean) {
        if(!bopExist) {alert('BOP 등록을 해주시기 바랍니다.'); return;}
    }
    return(
        <>
        <section className="ship-type-bop">
            <ul>
                {data?.map((list:DataType,index:number) => (
                    <li key={index}>
                        <div>
                            <div className="bop-image-area">
                                <Image src={list?.thumnailFile ? list?.thumnailFile : '/images/no-image.jpg'} onClick={()=>router.push(`/ship-type/${list?.ID}?t=assemble&m=FGSS`)} alt="sample" width={100} height={100}/>
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