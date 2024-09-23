'use client'
import api from "@/lib/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
interface Props {
    id : string | Blob
}
interface DataType {
    mainImage : File | Blob | null , shipName : string, company : string[] | Blob[]
}
export default function ShipManageMentEditBox ({id} : Props) {
    const router = useRouter()
    const [data , setData] = useState<DataType>({
        mainImage : null, shipName : '', company : []
    })
    const [partnerCompany , setPartnerCompany] = useState<string[]>([])
    const [preview , setPreview] = useState<string>('')
    function handleChange (e : React.ChangeEvent<HTMLInputElement>) {
        const {type , name, value, files} = e.target;
        if(type === 'file' && files && files[0]) {
            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = () => {
                setData((prev) => ({...prev , [name] : files[0]}))
                setPreview(reader.result as string)
            }
        }else if('checkbox'){

        }else{
            setData((prev) => ({...prev , [name] : value}))
        }
    }
    async function getPartnerCompany () {
        const response = await api.get(`/admin/setup/getPartnerCompany.php`)
    }
    async function save () {
        const formData = new FormData()
        if(id !== '0') {formData.append('ID' , id)}
        formData.append('shipTypeNameKr' , data?.shipName)
        formData.append('shipTypePartners' , data?.company.join(','))
        if(data?.mainImage){
            formData.append('thumnailImage' , data?.mainImage)
        }
        if(id === '0') {
            const response = await api.post(`/admin/setup/setShipType.php`, formData)
            if(response?.data?.result === true) {
                alert(response?.data?.resultMsg); router.push(`/ship-manage`)
            }else{
                alert(response?.data?.resultMsg)
            }
        }
    }
    useEffect(()=> {
        getPartnerCompany()
    }, [])
    return(
        <>
        <div className="ship-manage-regist">
            <section>
                <div>
                    <h2>선종 대표 이미지 (<span>*</span>)</h2>
                    <input type="file" name="mainImage" onChange={handleChange}/>
                </div>
                <div>
                    <h2>선종명 (<span>*</span>)</h2>
                    <input className="ship-name" type="text" name="shipName" value={data?.shipName} onChange={handleChange}/>
                </div>
            </section>
            <section>
                <h2>협력업체</h2>
                <div>
                    <label>
                        <input type="checkbox"/>
                        태광산업
                    </label>
                    <label>
                        <input type="checkbox"/>
                        영진용접
                    </label>
                    <label>
                        <input type="checkbox"/>
                        대한조선
                    </label>
                    <label>
                        <input type="checkbox"/>
                        업체명
                    </label>
                    <label>
                        <input type="checkbox"/>
                        업체명
                    </label>
                    <label>
                        <input type="checkbox"/>
                        업체명
                    </label>
                </div>
            </section>

        </div>
        <div className="btns2">
            <button onClick={()=>save()}>저장</button>
        </div>
        </>
    )
}