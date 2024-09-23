'use client'
import api from "@/lib/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
interface Props {
    id : string | Blob
}
interface DataType {
    mainImage : File |
    Blob | null , shipName : string, company : string[]
}
interface PartnerCompanyType {
    ID : string, activeStatus : string, companyAddr : string, companyBisinessLicense : string, companyBizDivision : string, 
    companyBizType : string, companyCeoMobile : string , companyCeoName : string, companyEmail : string, companyName : string,
    companyNotes : string, companyPhone : string, createDate : string
}
export default function ShipManageMentEditBox ({id} : Props) {
    const router = useRouter()
    const [data , setData] = useState<DataType>({
        mainImage : null, shipName : '', company : []
    })
    const [partnerCompany , setPartnerCompany] = useState<PartnerCompanyType[]>([])
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
        }else{
            setData((prev) => ({...prev , [name] : value}))
        }
    }
     function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>, companyId: string) {
        const isChecked = e.target.checked
        setData((prev) => {
            const updatedCompanies = isChecked
                ? [...prev.company, companyId] // 체크된 경우 ID 추가
                : prev.company.filter((id) => id !== companyId) // 체크 해제된 경우 ID 제거
            return { ...prev, company: updatedCompanies }
        })
    }
    async function getDetail () {
        const response = await api.get(`/admin/setup/getShipTypeDetail.php?ID=${id}`)
        if(response?.data?.result === true) {
            if(response?.data?.List?.length > 0) {
                const result = response?.data?.List[0]
                setData((prev) => ({...prev, shipName : result?.shipTypeName, company : []}))
                setPreview(result?.thumnailFile)
            }
        }
    }
    async function getPartnerCompany () {
        const response = await api.get(`/admin/setup/getPartnerCompanyList.php?page=1&size=99&sortColumn=companyName&sortOrder=desc`)
        if(response?.data?.result === true){
            setPartnerCompany(response?.data?.List)
            if(id !== '0') {getDetail()}
        }
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
        }else{
            const response = await api.post(`/admin/setup/updShipType.php`, formData)
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
                    <img src={preview}/>
                </div>
                <div>
                    <h2>선종명 (<span>*</span>)</h2>
                    <input className="ship-name" type="text" name="shipName" value={data?.shipName} onChange={handleChange}/>
                </div>
            </section>
            <section>
                <h2>협력업체</h2>
                <div>
                    {partnerCompany?.map((company : PartnerCompanyType, index:number) => (
                        <label key={index}>
                            <input 
                                type="checkbox"
                                onChange={(e)=>handleCheckboxChange(e, company?.ID)}
                                checked={data?.company?.includes(company?.ID)}
                            />
                            {company?.companyName}
                        </label>
                    ))}
                </div>
            </section>

        </div>
        <div className="btns2">
            <button onClick={()=>save()}>{id === '0' ? '등록' : '수정'}</button>
        </div>
        </>
    )
}