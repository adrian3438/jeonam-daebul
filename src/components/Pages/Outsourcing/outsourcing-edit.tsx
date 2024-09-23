'use client'

import api from "@/lib/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
    id : string | Blob,
}
interface DataType {
   companyName : string, ceoName : string, licenseNo : string, phone : string,
   ceoEmail : string, ceoMobile : string, bizDivision : string, bizType : string,
   address : string, notes : string
}
export default function OutsourcingEdit ({id} : Props) {
    const router = useRouter()
    const [data, setData] = useState<DataType>({
        companyName : '', ceoName : '', licenseNo : '', phone : '',
        ceoEmail : '', ceoMobile : '', bizDivision : '', bizType : '',
        address : '', notes : ''
    })
    function handleChange (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name , value} = e.target;
        setData((prev) => ({...prev, [name] : value}))
    }
    async function Save () {
        try{
            if(!data?.companyName) {alert('업체명을 입력해 주세요.'); return;}
            if(!data?.ceoName) {alert('대표자명을 입력해 주세요.');return;}
            if(!data?.licenseNo) {alert('사업자 등록번호를 입력해 주세요.'); return;}
            const formData = new FormData()
            if(id !== 'regist') {formData.append('ID', id)}
            formData.append('companyName', data?.companyName)
            formData.append('companyCeoName', data?.ceoName)
            formData.append('companyBisinessLicense', data?.licenseNo)
            formData.append('companyPhone', data?.phone)
            formData.append('companyCeoEmail', data?.ceoEmail)
            formData.append('companyCeoMobile', data?.ceoMobile)
            formData.append('companyBizType', data?.bizType)
            formData.append('companyBizDivision', data?.bizDivision)
            formData.append('companyAddr', data?.address)
            formData.append('companyNotes', data?.notes)
            if(id === 'regist') {
                const response = await api.post(`/admin/setup/setPartnerCompany.php`, formData)
                if(response?.data?.result === true) {
                    alert(response?.data?.resultMsg)
                    router.push(`/outsourcing`)
                }else{
                    alert(response?.data?.resultMsg)
                }
            }else{
                const response = await api.post(`/admin/setup/updPartnerCompany.php`, formData)
                if(response?.data?.result === true) {
                    alert(response?.data?.resultMsg)
                    router.back()
                }else{
                    alert(response?.data?.resultMsg)
                }
            }
        }catch{ alert('Server Error')
        }
    }
    useEffect(()=> {
        async function getDetail () {
            if(id !== 'regist') {
                const response = await api.get(`/admin/setup/getPartnerCompanyDetail.php?ID=${id}`)
                if(response?.data?.result === true) {
                    if(response?.data?.List?.length > 0) {
                        const result = response?.data?.List[0]
                        setData((prev) => ({...prev, 
                            companyName : result?.companyName, ceoName : result?.companyCeoName, licenseNo : result?.companyBisinessLicense, phone : result?.companyPhone,
                            ceoEmail : result?.companyEmail, ceoMobile : result?.companyCeoMobile, bizDivision : result?.companyBizDivision, bizType : result?.companyBizType,
                            address : result?.companyAddr, notes : result?.companyNotes
                        }))
                    }
                }
            }
        }
        getDetail()
    }, [])
    return(
        <>
        <div className="partner">
            <section>
                <h2><span>01</span> 기본정보</h2>
                <table className="table3">
                    <tbody>
                    <tr>
                        <th scope="row">업체명(*)</th>
                        <td><input type="text" name="companyName" value={data?.companyName} onChange={handleChange}/></td>
                        <th scope="row">대표자명(*)</th>
                        <td><input type="text" name="ceoName" value={data?.ceoName} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <th scope="row">사업자 등록번호(*)</th>
                        <td><input type="text" name="licenseNo" value={data?.licenseNo} onChange={handleChange}/></td>
                        <th scope="row">연락처</th>
                        <td><input type="text" name="phone" value={data?.phone} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자 이메일</th>
                        <td><input type="text" name="ceoEmail" value={data?.ceoEmail} onChange={handleChange}/></td>
                        <th scope="row">대표자 핸드폰</th>
                        <td><input type="text" name="ceoMobile" value={data?.ceoMobile} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <th scope="row">업태</th>
                        <td><input type="text" name="bizType" value={data?.bizType} onChange={handleChange}/></td>
                        <th scope="row">업종</th>
                        <td><input type="text" name="bizDivision" value={data?.bizDivision} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <th scope="row">주소</th>
                        <td colSpan={3}><input type="text" name="address" value={data?.address} onChange={handleChange}/></td>
                    </tr>
                    </tbody>
                </table>
            </section>
            <section>
                <h2><span>02</span> 메모사항</h2>
                <textarea name="notes" value={data?.notes} onChange={handleChange}>
                </textarea>
            </section>
            <div className="btns4">
                <button onClick={Save}>저장</button>
            </div>
        </div>
</>
)
}