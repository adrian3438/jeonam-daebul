'use client'
import api from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
interface Props {
    id : string | Blob
    list : []
}
export default function ShipAssembleListBox ({
    id, list
} : Props) {
    const [data, setData] = useState<any>(list)
    async function getList () {
        const response = await api.get(`/admin/setup/getShipAssembleList.php?shipTypeId=${id}`)
    }
    useEffect(() => {
        getList()
    }, [])
    return(
        <>
        <section className="ship-bop-manage-list">
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