'use client'
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import Navigation from "./Navigation"
import Header from "./Header"
import { useAuth } from "./Context/AuthContext"
import api from "@/lib/api"


interface Props {children: ReactNode, cookie : any}
export default function Container ({children , cookie} : Props) {
    const router = useRouter()
    const pathname = usePathname()
    const splitPath = pathname.split('/');
    const {login} = useAuth()
    const cookieValue = cookie && JSON.parse(cookie.value).id;
    const cookieBranch = cookie && JSON.parse(cookie.value).branch;
    console.log(cookieBranch)
    // 유저 정보 호출
    async function getUserInfo () {
        if(cookie && cookieBranch === 'user') {
            // const formData = new FormData()
            // formData.append('userUuid' , cookieValue)
            // const response = await api.post(`/user/userInfo.php`, formData)
            login({isAdmin : false , data : null})
        }
    }
    // 관리자 정보 호출
    async function getAdminInfo () {
        if(cookie && cookieBranch === 'admin') {
            const formData = new FormData()
            formData.append('managerUuid' , cookieValue)
            const response = await api.post('/admin/adminInfo.php', formData)
            if(response?.data?.result === true){
                login({isAdmin : true , data : response?.data?.list[0]})
                if(splitPath[1] === 'dotsAdmin'){
                    location.href = '/ship-type';
                }
            }else{
                alert('로그인이 필요합니다.'); 
                location.href = '/dotsAdmin';
            }
        }
    }
    
    useEffect(() => {
        if(cookieBranch === 'user') {getUserInfo()}
        else if(cookieBranch === 'admin') {getAdminInfo()}
        else {
            if(pathname !== '/' && pathname !== '/dotsAdmin'){
                alert('로그인이 필요합니다.');
                router.push('/')
            }
        }
    }, [pathname])
    return(
        <>
            {splitPath[1] === '' || splitPath[1] === 'dotsAdmin' ?

            <>
                {children}
            </>
            :

            <>
                <div className="snb">
                    <Navigation/>
                </div>
                <main>
                <Header 
                    cookieBranch={cookieBranch}
                />
                    {children}
                </main>
            </>
            }
        
        </>
    )
}