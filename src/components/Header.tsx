'use client'
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./Context/AuthContext";

interface Props {info : any}
export default function Header({info} : Props) {
    const {authData, logout} = useAuth()
    return (
        <header>
            <div className="header-title">
                <h2><Image src="/images/alink3d.svg" alt="ALINK3D" width={119} height={37}/></h2>
            </div>
            <div className="logout">
                {info?.name} | <Link href="/dotsAdmin">로그아웃</Link>
            </div>
        </header>
    )
}