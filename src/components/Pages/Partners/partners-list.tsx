'use client' 
import calCulateIndex from "@/components/calculateIndex";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface DataType {
    ID : string | Blob , userLoginId : string, userName : string, userCompanyName : string,
    userPhone : string, userMobile : string, userEmail : string, userDept : string,
    userPosition : string, activeStatus : string, createDate : string
}
interface Props {
    data : []
    totalCount : number
    page : number
    size : number
    sortColumn : string
    sortOrder : string
}
export default function PartnersListBox ({
    data , totalCount, page , size, sortColumn, sortOrder
} : Props) {
    const router = useRouter()
    const [list, setList] = useState<any>(data)
    const [totalCnt , setTotalCnt] = useState<number>(totalCount)
    async function getList () {
        const response = await api.get(`/admin/user/getUserList.php?page=${page || 1}&size=${size || 10}&sortColumn=${sortColumn || 'userName'}&sortOrder=${sortOrder || 'desc'}`)
        if(response?.data?.result === true) {
            setList(response?.data?.List); setTotalCnt(response?.data?.totalCnt)
        }
    } 
    async function ChangeStatus (id : string | Blob, status : string) {
        const formData = new FormData()
        formData.append('ID' , id)
        formData.append('activeStatus' , status === 'Y' ? 'N' : 'Y')
        const response = await api.post(`/admin/user/updUserStatus.php`, formData)
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
        <table className="table">
            <thead>
            <tr>
                <th scope="col">No.</th>
                <th scope="col">업체명</th>
                <th scope="col">담당자 이름</th>
                <th scope="col">핸드폰</th>
                <th scope="col">연락처</th>
                <th scope="col">이메일</th>
                <th scope="col">등록일자</th>
                <th scope="col">상태</th>
                <th scope="col">액션</th>
            </tr>
            </thead>
            <tbody>
                {list?.map((list:DataType, index:number) => {
                    const calculatedIndex = calCulateIndex(page, size, totalCnt, index);
                    return(
                        <tr key={index}>
                            <td>{calculatedIndex}</td>
                            <td>{list?.userCompanyName}</td>
                            <td style={{textAlign: 'left'}}>{list?.userName}</td>
                            <td>{list?.userMobile ? list?.userMobile : '-'}</td>
                            <td>{list?.userPhone ? list?.userPhone : '-'}</td>
                            <td>{list?.userEmail ? list?.userEmail : '-'}</td>
                            <td>{list?.createDate ? list?.createDate : '-'}</td>
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
                                <a style={{cursor : 'pointer'}} onClick={()=>router.push(`/partner/${list?.ID}`)}><Image src="/images/write.svg" alt="작성" width={20} height={20}/></a>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

        <div className="pagination">
            페이징 들어감
            <div className='btns'>
                <Link href='/partner/regist'>등록</Link>
            </div>
        </div>
        </>
    )
}