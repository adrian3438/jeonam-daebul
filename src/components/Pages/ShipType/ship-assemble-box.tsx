'use client' 
import Link from "next/link";

export default function ShipAssembleBox () {

    return(
        <>
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
        </>
    )
}