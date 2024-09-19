import Link from "next/link";
import Image from "next/image";
import "@/app/assets/main.scss";
import "@/app/assets/shipList.scss";

export default function Main() {
    return (
        <div className="ship-list">
            <section className="ship-type">
                <ul>
                    <li className="active">
                        <button>
                            <Image src="/images/@temp/sample01.jpg" alt="sample" width={50} height={50}/>
                        </button>
                        <p>호선 1번</p>
                    </li>
                    <li>
                        <button>
                            <Image src="/images/@temp/sample01.jpg" alt="sample" width={50} height={50}/>
                        </button>
                        <p>호선 2번</p>
                    </li>
                    <li>
                        <button>
                            <Image src="/images/@temp/sample01.jpg" alt="sample" width={50} height={50}/>
                        </button>
                        <p>호선 2번</p>
                    </li>
                    <li>
                        <button>
                            <Image src="/images/@temp/sample01.jpg" alt="sample" width={50} height={50}/>
                        </button>
                        <p>호선 3번</p>
                    </li>
                </ul>
            </section>
            <section className="ship-type-bop">
                <ul>
                    <li>
                        <div>
                            <div className="bop-image-area">
                                이미지 영역
                            </div>
                            <div className="bop-info-area">
                                <p>S11C</p>
                                <p className="registed">BOP <Link href="#">수정</Link></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div className="bop-image-area">
                                이미지 영역
                            </div>
                            <div className="bop-info-area">
                                <p>S11C</p>
                                <p className="no-registed">BOP <Link href="#">등록</Link></p>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    )
}