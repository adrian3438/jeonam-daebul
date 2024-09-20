'use client'
import api from "@/lib/api";
// import { useAppDispatch } from "@/store/hooks";
// import { setAccount } from "@/store/slices/accountInfoSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { useAuth } from "../Context/AuthContext";
interface LoginType {email:string,password:string}
export default function AdminLoginPage () {
    const router = useRouter()
    const {login} = useAuth()
    // const dispatch = useAppDispatch()
    const [data, setData] = useState<LoginType>({
        email : '', password : ''
    })
    function handleChange (e:React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setData((prev) => ({...prev, [name] : value}))
    }
    async function Login (e:React.MouseEvent<HTMLInputElement> | any) {
        e.preventDefault();
        if(!data?.email) {alert('이메일을 입력해 주세요.'); return;}
        if(!data?.password) {alert('비밀번호를 입력해 주세요.'); return;}
        const formData = new FormData()
        formData.append('managerLoginId', data?.email)
        formData.append('managerPass', data?.password)
        const response = await api.post(`/admin/adminLogin2.php`, formData)
        if(response?.data?.result === true) {
          // const cookiesData = {
          //   ssid : response?.data?.uuid,
          //   jdad : true
          // }
          Cookies.set('jdassid', response?.data?.uuid , { expires: 7, path : '/' });
          router.push('/ship-type');
          login({isAdmin : true , data : response?.data})
        }else {
            alert(response?.data?.resultMsg);
            setData((prev) => ({...prev, password : ''}))
        }
    }
    function Enter (e : React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter') Login(e)
    }
    
    return(
        <>
        <section className="login-section">
          <div>
            <h2>로그인</h2>
            <form id="login">
              <fieldset className="input-email">
                <label htmlFor="email">이메일</label>
                <input id="email" name="email" onKeyDown={Enter} onChange={handleChange} type="text" required/>
              </fieldset>
              <fieldset className="input-password">
                <label htmlFor="password">비밀번호</label>
                <input id="password" name="password" onKeyDown={Enter} onChange={handleChange} type="password" required/>
              </fieldset>
              <fieldset className="join">
                <Link href="#">회원가입</Link> | <Link href="#">비밀번호 찾기</Link>
              </fieldset>
              <input type="submit" onClick={(e)=>Login(e)} style={{cursor:'pointer'}} value="로그인" className="login-btn"/>
            </form>
            <p><Image src="/images/login/img_logo.svg" alt="전남대불산학융합원" width={295} height={43}/></p>
            <p className="phone">061)469-7000</p>
            <address>(58457) 전남 영암군 삼호읍 대불주거 3로 75,<br/>산학융합센터(B동)</address>
          </div>
        </section>
        </>
    )
}