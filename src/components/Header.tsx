'use client'
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./Context/AuthContext";
import { useRouter } from "next/navigation";
import { LinkHTMLAttributes } from "react";
import Cookies from 'js-cookie'
interface Props {cookieBranch : string}
export default function Header({cookieBranch} : Props) {
    const router = useRouter()
    const {authData, logout} = useAuth()
    console.log(authData)
    function Logout (e : React.MouseEvent) {
        e.preventDefault()
        if(cookieBranch === 'admin') {
            router.push('/dotsAdmin')
        }else{
            location.href = '/'
        }
        Cookies.remove('jdssid')
        logout();
    }
    return (
        <header>
            <div className="header-title">
                <h2><Image src="/images/alink3d.svg" alt="ALINK3D" width={119} height={37}/></h2>
            </div>
            <div className="logout">
                {authData?.data?.name} | <Link href={'#'} onClick={(e)=>Logout(e)}>로그아웃</Link>
            </div>
        </header>
    )
}