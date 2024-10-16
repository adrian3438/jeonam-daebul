'use client'
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./Context/AuthContext";
import { useRouter } from "next/navigation";
import { LinkHTMLAttributes } from "react";
import Cookies from 'js-cookie'
export default function Header() {
    const router = useRouter()
    const {authData, logout} = useAuth()
    // console.log(authData)
    function Logout (e : React.MouseEvent) {
        e.preventDefault()
        logout();
        router.push('/dotsAdmin')
    }
    return (
        <header>
            <div className="header-title">
                <h2><Image src="/images/alink3d.svg" alt="ALINK3D" width={119} height={37}/></h2>
            </div>
            <div className="logout">
                관리자이름 | <Link href={'#'} onClick={(e)=>Logout(e)}>로그아웃</Link>
            </div>
        </header>
    )
}