'use client'

import calCulateIndex from "@/components/calculateIndex";
import SettingModal from "@/components/SettingModal";
import api from "@/lib/api";
import { useEffect, useState } from "react";
interface ManagerType {
    ID : number
    activeStatus : string
    managerDept : string
    managerEmail : string
    managerLogin : string
    managerMobile : string
    managerName : string
    managerPhone : string
    managerPosition : string
}
export default function AdminList () {
    const [id , setId] = useState<number>(0)
    const [data , setData] = useState<ManagerType[]>([])
    const [totalCount , setTotalCount] = useState<number>(0)

    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [contentLabel, setContentLabel] = useState("");
    const openModal1 = () => {
        setModalIsOpen1(true);
    };

    const openModal2 = (id : number) => {
        setId(id)
        setModalIsOpen1(true);
    };

    const closeModal = () => {
        setId(0)
        setModalIsOpen1(false);
    };
    
    async function getList () {
        const response = await api.get(`/admin/manager/getManagerList.php?page=1&size=10&keyword=&sortColumn=managerName&sortOrder=desc`)
        if(response?.data?.Result === true) {
            setData(response?.data?.List); setTotalCount(response?.data?.totalCnt)
        }
    }

    async function ChangeStaus (id : number | any , status : string) {
        const formData = new FormData()
        formData.append('ID' , id)
        formData.append('activeStatus', status === 'Y' ? 'N' : 'Y')
        const response = await api.post(`/admin/manager/updActiveStatus.php`, formData)
        if(response?.data?.result === true) { getList() }
    }

    useEffect(()=> {
        getList()
    }, [])
    return(
        <>
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
                    {data?.map((list:ManagerType, index:number) => {
                        const indexNumber = calCulateIndex(1, 10, totalCount, index);
                        return(
                            <tr key={index}>
                                <td>{indexNumber}</td>
                                <td>{list?.managerName}</td>
                                <td>{list?.managerDept}</td>
                                <td>{list?.managerLogin}</td>
                                <td>{list?.managerPhone}</td>
                                <td>{list?.managerMobile}</td>
                                <td>
                                    <label className="toggle_switch">
                                        <input
                                            type="checkbox"
                                            checked={list?.activeStatus === 'Y'}
                                            onChange={()=>ChangeStaus(list?.ID, list?.activeStatus)}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </td>
                                <td>
                                    <button className="btn2" onClick={()=>openModal2(list?.ID)}>수정</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <SettingModal 
                id={id}
                isOpen={modalIsOpen1} 
                onRequestClose={closeModal} 
                contentLabel={contentLabel}
            />
        </>
    )
}