'use client'
import api from "@/lib/api";
import Image from "next/image";
import { useState } from "react";
interface Props {
    id : string | Blob
    bopid : any
}
export default function BopEditBox ({
    id , bopid
} : Props) {
    const [data , setData] = useState<any>([])

    async function getDetail () {
        const response = await api.get(`/admin/setup/getBopDetail.php?ID=${id}`)
        if(response?.data?.result === true){
            
        }
    }
    return(
        <>
        <div className="bop-manage-regist">
            <section>
                <div>
                    <h2>BOP 대표 이미지 (<span>*</span>)</h2>
                    <input type="file"/>
                    <p className="uploaded-img">
                        <Image src="/images/@temp/uploaded-img-sample.jpg" alt="대조" width={81} height={23}/>
                        <span>test-shi9p01.jpg</span>
                    </p>
                </div>
                <div>
                    <h2>BOP명 (<span>*</span>)</h2>
                    <input type="text" className="ship-name"/>
                </div>
                <div>
                    <h2>BOP 특이사항 (<span>*</span>)</h2>
                    <textarea></textarea>
                </div>
            </section>
            <section>
                <div>
                    <h2>모델링 파일</h2>
                    <div>
                        <p><label>JSON</label><input type="file"/></p>
                        <p><label>BIN</label><input type="file"/></p>
                        <p><label>XVL</label><input type="file"/></p>
                    </div>
                </div>
                <div>
                </div>
            </section>
        </div>
        <div className="btns2">
            <button>저장</button>
        </div>
        </>
    )
}