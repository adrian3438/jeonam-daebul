import "@/app/assets/main.scss";
import "@/app/assets/partner.scss";
import React from "react";

export default function PartnerRegist() {
    return (
        <div className="partner">
            <section>
                <h2><span>01</span> 기본정보</h2>
                <table className="table3">
                    <tbody>
                    <tr>
                        <th scope="row">업체명(*)</th>
                        <td><input type="text"/></td>
                        <th scope="row">대표자명(*)</th>
                        <td><input type="text"/></td>
                    </tr>
                    <tr>
                        <th scope="row">사업자 등록번호(*)</th>
                        <td><input type="text"/></td>
                        <th scope="row">연락처</th>
                        <td><input type="text"/></td>
                    </tr>
                    <tr>
                        <th scope="row">대표자 이메일</th>
                        <td><input type="text"/></td>
                        <th scope="row">대표자 핸드폰</th>
                        <td><input type="text"/></td>
                    </tr>
                    <tr>
                        <th scope="row">업태</th>
                        <td><input type="text"/></td>
                        <th scope="row">업종</th>
                        <td><input type="text"/></td>
                    </tr>
                    <tr>
                        <th scope="row">주소</th>
                        <td colSpan={3}><input type="text"/></td>
                    </tr>
                    </tbody>
                </table>
            </section>
            <section>
                <h2><span>02</span> 메모사항</h2>
                <textarea>
                </textarea>
            </section>
            <div className="btns4">
                <button>저장</button>
            </div>
        </div>
    )
}