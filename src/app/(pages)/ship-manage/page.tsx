import "@/app/assets/main.scss";
import "@/app/assets/ship-manage.scss";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ShipManage() {
    return (
        <div className="ship-manage">
            <div className="ship-manage-list">
                <ul>
                    <li className="active">
                        <button>
                            <Image src="/images/@temp/sample01.jpg" alt="sample" width={50} height={50}/>
                        </button>
                        <div>
                            <p>호선 1번</p>
                            <div>
                                <Link href="/ship-manage/1"><Image src="/images/manage.svg" alt="수정" width={20} height={20}/></Link>
                                <Link href="/ship-manage/regist"><Image src="/images/write.svg" alt="수정" width={20} height={20}/></Link>
                            </div>
                        </div>
                    </li>
                    <li className="active">
                        <button>
                            <Image src="/images/@temp/sample01.jpg" alt="sample" width={50} height={50}/>
                        </button>
                        <div>
                            <p>호선 2번</p>
                            <div>
                                <Link href="/ship-manage/1"><Image src="/images/manage.svg" alt="수정" width={20} height={20}/></Link>
                                <Link href="/ship-manage/regist"><Image src="/images/write.svg" alt="수정" width={20} height={20}/></Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="pagination">
                <div className='btns'>
                    <Link href="/ship-manage/regist">등록</Link>
                </div>
            </div>
        </div>
    )
}