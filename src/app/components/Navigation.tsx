import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
    return (
        <>
            <h1><Image src="/images/login/img_logo.svg" alt="전남대불산학융합원" width={189} height={24}/></h1>
            <div className="menus">
                <section className="menu">
                    <p>MENU</p>
                    <ul>
                        <li className="ship-type active"><Link href="/main">선종</Link></li>
                    </ul>
                </section>
                <section className="settings">
                    <p>OTHERS</p>
                    <ul>
                        <li><p>설정</p>
                            <ul>
                                <li><Link href="#">선종 관리</Link></li>
                                <li><Link href="#">외주업체 관리</Link></li>
                                <li><Link href="#">관리자 관리</Link></li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </div>
            <div className="help">
                <p><Link href="#">Help</Link></p>
            </div>
            <p className="snb-footer-text">중앙해양중공업</p>
        </>
    )
}