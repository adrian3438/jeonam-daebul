'use client';

import "@/app/assets/main.scss";
import "@/app/assets/setting.scss";
import React, {useState} from "react";
import SettingModal from '@/components/SettingModal'

export default function ManagerList() {
    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [contentLabel, setContentLabel] = useState("");

    const openModal1 = () => {
        setModalIsOpen1(true);
        setContentLabel('관리자 신규 등록');
    };

    const openModal2 = () => {
        setModalIsOpen1(true);
        setContentLabel('관리자 수정');
    };

    const closeModal = () => {
        setModalIsOpen1(false);
    };

    return (
        <div className="manager">
            <div className="btns3">
                <button onClick={openModal1}>신규등록</button>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">이름</th>
                    <th scope="col">부서</th>
                    <th scope="col">아이디</th>
                    <th scope="col">휴대폰</th>
                    <th scope="col">전화번호</th>
                    <th scope="col">직원여부</th>
                    <th scope="col">관리</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>홍길동</td>
                    <td>마케팅</td>
                    <td>test</td>
                    <td>010-0000-2222</td>
                    <td>052-2323-2222</td>
                    <td>
                        <label className="toggle_switch">
                            <input
                                type="checkbox"
                            />
                            <span className="slider"></span>
                        </label>
                    </td>
                    <td>
                        <button className="btn2" onClick={openModal2}>수정</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <SettingModal isOpen={modalIsOpen1} onRequestClose={closeModal} contentLabel={contentLabel}/>
        </div>
    )
}