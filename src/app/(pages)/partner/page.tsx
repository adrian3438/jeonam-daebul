import "@/app/assets/main.scss";
import "@/app/assets/partner.scss";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function OutsourcingList() {
    return (
        <div className="partner">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">업체명</th>
                    <th scope="col">대표자명</th>
                    <th scope="col">사업자 등록번호</th>
                    <th scope="col">연락처</th>
                    <th scope="col">대표이메일</th>
                    <th scope="col">등록일자</th>
                    <th scope="col">상태</th>
                    <th scope="col">액션</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>10</td>
                    <td style={{textAlign: 'left'}}>업체명 1</td>
                    <td>홍길동</td>
                    <td>010-0000-2222</td>
                    <td>052-2323-2222</td>
                    <td>test@test.com</td>
                    <td>2024-02-20</td>
                    <td>
                        <label className="toggle_switch">
                            <input type="checkbox"/>
                            <span className="slider"></span>
                        </label>
                    </td>
                    <td>
                        <a href={"/outsourcing/regist"}><Image src="/images/write.svg" alt="작성" width={20} height={20}/></a>
                    </td>
                </tr>
                <tr>
                    <td>9</td>
                    <td style={{textAlign: 'left'}}>업체명 1</td>
                    <td>홍길동</td>
                    <td>010-0000-2222</td>
                    <td>052-2323-2222</td>
                    <td>test@test.com</td>
                    <td>2024-02-20</td>
                    <td>
                        <label className="toggle_switch">
                            <input type="checkbox"/>
                            <span className="slider"></span>
                        </label>
                    </td>
                    <td>
                        <a href={"/outsourcing/regist"}><Image src="/images/write.svg" alt="작성" width={20} height={20}/></a>
                    </td>
                </tr>
                <tr>
                    <td>8</td>
                    <td style={{textAlign: 'left'}}>업체명 1</td>
                    <td>홍길동</td>
                    <td>010-0000-2222</td>
                    <td>052-2323-2222</td>
                    <td>test@test.com</td>
                    <td>2024-02-20</td>
                    <td>
                        <label className="toggle_switch">
                            <input type="checkbox"/>
                            <span className="slider"></span>
                        </label>
                    </td>
                    <td>
                        <a href={"/partner/regist"}><Image src="/images/write.svg" alt="작성" width={20} height={20}/></a>
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="pagination">
                페이징 들어감
                <div className='btns'>
                    <Link href='/partner/regist'>등록</Link>
                </div>
            </div>
        </div>
    )
}