import "@/app/assets/main.scss";
import "@/app/assets/ship-manage.scss";
import React from "react";
import Link from "next/link";

export default function ShipBopManage() {
    return (
        <>
            <section className="ship-bop-manage-list">
                <div className="search-bar-area">
                    <div className="search-bar">
                        <input type="text" maxLength={50}/>
                        <input type="button" value={"검색"} className="search-btn"/>
                    </div>
                </div>
                <ul>
                    <li>
                        <div>
                            <div className="bop-image-area">
                                이미지 영역
                            </div>
                            <div className="bop-info-area">
                                <p className="subsidary-regist">S11C <Link href="/ship-manage/1/regist-subsidary">수정</Link></p>
                                <p className="registed">BOP <Link href="/ship-manage/1/regist-bop">수정</Link></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div className="bop-image-area">
                                이미지 영역
                            </div>
                            <div className="bop-info-area">
                                <p className="subsidary-regist">S11C <Link href="#">수정</Link></p>
                                <p className="no-registed">BOP <Link href="/ship-manage/1/regist-bop">등록</Link></p>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>

            <div className="pagination">
                <div className='btns'>
                    <Link href="/ship-manage/1/regist-subsidary">등록</Link>
                </div>
            </div>
        </>
    )
}