import "@/app/assets/main.scss";
import "@/app/assets/outsourcing.scss";
import React from "react";

export default function OutsourcingRegist() {
    return (
        <div className="outsourcing">
            <section>
                <h2><span>01</span> 기본정보</h2>
                <table className="table3">
                    <tbody>
                    <tr>
                        <th scope="row">업체명</th>
                        <td><input type="text"/></td>
                        <th scope="row">담당자 이름</th>
                        <td><input type="text"/></td>
                    </tr>
                    <tr>
                        <th scope="row">로그인 아이디</th>
                        <td><input type="text"/></td>
                        <th scope="row">임시 비밀번호</th>
                        <td><input type="text"/></td>
                    </tr>
                    <tr>
                        <th scope="row">담당자 핸드폰</th>
                        <td><input type="text"/></td>
                        <th scope="row">담당자 연락처</th>
                        <td><input type="text"/></td>
                    </tr>
                    <tr>
                        <th scope="row">부서</th>
                        <td><input type="text"/></td>
                        <th scope="row">직급</th>
                        <td><input type="text"/></td>
                    </tr>
                    <tr>
                        <th scope="row">담당자 이메일</th>
                        <td colSpan={3}><input type="text"/></td>
                    </tr>
                    </tbody>
                </table>
            </section>
            <section>
                <h2><span>02</span> 메모사항</h2>
                <textarea>
                    sdfkjsdlkf
                    fsdlkhfslkdhfdslh
                </textarea>
            </section>
        </div>
    )
}