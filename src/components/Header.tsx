'use client'
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./Context/AuthContext";
import { useRouter } from "next/navigation";
import { LinkHTMLAttributes } from "react";
import Cookies from 'js-cookie'
interface Props {info : any}
export default function Header({info} : Props) {
    const router = useRouter()
    const {authData, logout} = useAuth()
    console.log(authData)
    function Logout (e : React.MouseEvent) {
        e.preventDefault()
        logout();
        router.push('/dotsAdmin')
        Cookies.remove('jdassid', {path : '/'})
        // if(authData?.isAdmin){
        //     router.push('/dotsAdmin')
        //     Cookies.remove('jdassid', {path : '/'})
        // }
    }
    return (
        <header>
            <div className="header-title">
                <h2><Image src="/images/alink3d.svg" alt="ALINK3D" width={119} height={37}/></h2>
            </div>
            <div className="logout">
                {info?.name} | <Link href={'#'} onClick={(e)=>Logout(e)}>로그아웃</Link>
            </div>
        </header>
    )
}