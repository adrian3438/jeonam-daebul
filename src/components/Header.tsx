
import Image from "next/image";
import Link from "next/link";


export default function Header() {
    return (
        <header>
            <div className="header-title">
                <h2><Image src="/images/alink3d.svg" alt="ALINK3D" width={119} height={37}/></h2>
            </div>
            <div className="logout">
                홍길동 | <Link href="/">로그아웃</Link>
            </div>
        </header>
    )
}