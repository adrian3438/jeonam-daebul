'use client'

import api from "@/lib/api"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props {
    id : string | undefined
}
interface DataType {
    loginId : string, name : string, pass : string, 
    companyName : string, mobile : string, phone : string,
    email : string, dept : string, position : string, note : string
}
export default function OutsourcingEdit ({id} : Props) {
    const router = useRouter()
    const [data, setData] = useState<DataType>({
        loginId : '', name : '', pass : '', companyName : '', mobile : '',
        phone : '', email : '', dept : '', position : '', note : ''
    })
    function handleChange (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name , value} = e.target;
        setData((prev) => ({...prev, [name] : value}))
    }
    async function Save () {
        const formData = new FormData()
        formData.append('userLoginId', data?.loginId)
        formData.append('userName', data?.name)
        formData.append('userPass', data?.pass)
        formData.append('userCompanyName', data?.companyName)
        formData.append('userMobile ', data?.mobile)
        formData.append('userPhone', data?.phone)
        formData.append('userEmail', data?.email)
        formData.append('userDept', data?.dept)
        formData.append('userPosition', data?.position)
        formData.append('userNotes', data?.note)
        const response = await api.post(`/admin/user/setUser.php`, formData)
        if(response?.data?.result === true) {
            alert(response?.data?.resultMsg); 
            router.push(`/outsourcing`)
        }else{alert(response?.data?.resultMsg)}
    }
    return(
        <>
        <section>
            <h2><span>01</span> 기본정보</h2>
            <table className="table3">
                <tbody>
                <tr>
                    <th scope="row">업체명</th>
                    <td><input type="text" name="companyName" value={data?.companyName} onChange={handleChange}/></td>
                    <th scope="row">담당자 이름</th>
                    <td><input type="text" name="name" value={data?.name} onChange={handleChange}/></td>
                </tr>
                <tr>
                    <th scope="row">로그인 아이디</th>
                    <td><input type="text" name="loginId" value={data?.loginId} onChange={handleChange}/></td>
                    <th scope="row">임시 비밀번호</th>
                    <td><input type="text" name="pass" value={data?.pass} onChange={handleChange}/></td>
                </tr>
                <tr>
                    <th scope="row">담당자 핸드폰</th>
                    <td><input type="text" name="mobile" value={data?.mobile} onChange={handleChange}/></td>
                    <th scope="row">담당자 연락처</th>
                    <td><input type="text" name="phone" value={data?.phone} onChange={handleChange}/></td>
                </tr>
                <tr>
                    <th scope="row">부서</th>
                    <td><input type="text" name="dept" value={data?.dept} onChange={handleChange}/></td>
                    <th scope="row">직급</th>
                    <td><input type="text" name="position" value={data?.position} onChange={handleChange}/></td>
                </tr>
                <tr>
                    <th scope="row">담당자 이메일</th>
                    <td colSpan={3}><input type="text" name="email" value={data?.email} onChange={handleChange}/></td>
                </tr>
                </tbody>
            </table>
        </section>
        <section>
            <h2><span>02</span> 메모사항</h2>
            <textarea name="note" value={data?.note} onChange={handleChange}>
                
            </textarea>
        </section>
        <section>
            <button>이전으로</button>
            <button>{id === 'regist' ? '저장하기' : '수정하기'}</button>
        </section>
        </>
    )
}