'use client'
import Link from "next/link";
import Image from "next/image";
import Paginate from "@/components/Paginate/pagination";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import calCulateIndex from "@/components/calculateIndex";
interface PartnerCompanyType {
    ID : string | Blob, activeStatus : string, companyAddr : string, companyBisinessLicense : string, companyBizDivision : string,
    companyBizType : string, companyCeoMobile : string , companyCeoName : string, companyEmail : string, companyName : string,
    companyNotes : string, companyPhone : string, createDate : string
}
interface Props {
    data : []
    totalCount : number
    page : number
    size : number
    sortColumn : string
    sortOrder : string
}
export default function OutsourcingListBox ({
    data , totalCount, page , size, sortColumn, sortOrder
} : Props) {
    const router = useRouter()
    const [list, setList] = useState<any>(data)
    const [totalCnt , setTotalCnt] = useState<number>(totalCount)
    async function getList () {
        const response = await api.get(`/admin/setup/getPartnerCompanyList.php?page=${page || 1}&size=${size || 10}&sortColumn=${sortColumn || 'companyName'}&sortOrder=${sortOrder || 'desc'}`)
        if(response?.data?.result === true) {
            setList(response?.data?.List); setTotalCnt(response?.data?.totalCnt)
        }
    }
    async function ChangeStatus (id : string | Blob, status : string) {
        const formData = new FormData()
        formData.append('ID' , id)
        formData.append('activeStatus' , status === 'Y' ? 'N' : 'Y')
        const response = await api.post(`/admin/setup/updPartnerCompanyStatus.php`, formData)
        if(response?.data?.result === true) {
            getList()
        }else{
            alert(response?.data?.resultMsg)
        }
    }

    useEffect(()=>{
        getList()
    }, [])
    return(
        <>
            <div className="search-bar-area2">
                <div className='btns'>
                    <Link href='/outsourcing/regist'>등록</Link>
                </div>
                <div className="search-bar">
                    <input type="text" maxLength={50}/>
                    <input type="button" value={"검색"} className="search-btn"/>
                </div>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">업체명</th>
                    <th scope="col">대표자명</th>
                    <th scope="col">사업자 등록번호</th>
                    <th scope="col">연락처</th>
                    <th scope="col">대표이메일</th>
                    <th scope="col">등록일자</th>
                    <th scope="col">상태</th>
                    <th scope="col">액션</th>
                </tr>
                </thead>
                <tbody>
                {list?.map((list: PartnerCompanyType, index: number) => {
                    const calculatedIndex = calCulateIndex(page, size, totalCnt, index);
                    return (
                        <tr key={index}>
                            <td>{calculatedIndex}</td>
                            <td style={{textAlign: 'left'}}>{list?.companyName}</td>
                            <td>{list?.companyCeoName}</td>
                            <td>{list?.companyBisinessLicense}</td>
                            <td>{list?.companyPhone ? list?.companyPhone : '-'}</td>
                            <td>{list?.companyEmail}</td>
                            <td>{list?.createDate}</td>
                            <td>
                                <label className="toggle_switch">
                                    <input
                                        type="checkbox"
                                        checked={list?.activeStatus === 'Y'}
                                        onChange={() => ChangeStatus(list?.ID, list?.activeStatus)}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </td>
                            <td>
                                <a href={`/outsourcing/${list?.ID}`}><Image src="/images/write.svg" alt="작성" width={20} height={20}/></a>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>

            <div className="pagination">
                <Paginate page={page} size={size} totalCount={totalCount}/>
            </div>
        </>
    )
}
