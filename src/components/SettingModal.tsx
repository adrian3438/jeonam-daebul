import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import Link from "next/link";
import api from '@/lib/api';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '50vh',
        height: '73vh',
        transform: 'translate(-50%, -50%)',
    },
};

interface CustomModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
    id : any
}

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
    managerPass : string
    managerPassConfirm : string
}

const SettingModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, contentLabel , id }) => {
    const [data, setData] = useState<ManagerType>({
        ID : 0 , activeStatus : '', managerDept : '', managerEmail : '', managerLogin : '', managerMobile : '',
        managerName : '', managerPhone : '', managerPosition : '' , managerPass : '', managerPassConfirm : ''
    })
    
    function handleChange (e:React.ChangeEvent<HTMLInputElement>) {
        const {name , value} = e.target;
        setData((prev:any) => ({...prev, [name] : value}))
    }
    async function Save () {
        if(!data?.managerLogin) {alert('아이디를 입력해 주세요.'); return;}
        if(!data?.managerName) {alert('이름을 입력해 주세요.'); return;}
        if(!data?.managerDept) {alert('부서를 입력해 주세요.'); return;}
        if(!data?.managerEmail) {alert('이메일을 입력해 주세요.'); return;}
        const formData = new FormData();
        if(id!==0) {formData.append('ID', id)}
        formData.append('managerLogin' , data?.managerLogin)
        if(data?.managerPass) {
            if(data?.managerPass === data?.managerPassConfirm){
                formData.append('managerPass' , data?.managerPass)
            }else{
                alert('비밀번호를 재확인해주시기 바랍니다.'); return;
            }
        }else{
            if(id === 0) {
                alert('비밀번호를 입력해주시기 바랍니다.'); return;
            }
        }
        formData.append('managerName' , data?.managerName)
        formData.append('managerPhone', data?.managerPhone)
        formData.append('managerMobile', data?.managerMobile)
        formData.append('managerEmail', data?.managerEmail)
        formData.append('managerPosition', data?.managerPosition)
        formData.append('managerDept' , data?.managerDept)
        if(id === 0) {
            const response = await api.post(`/admin/manager/setManager.php`, formData)
            if(response?.data?.result === true) {
                alert(response?.data?.resultMsg); onRequestClose()
            }else{
                alert(response?.data?.resultMsg)
            }
        }else{
            const response = await api.post(`/admin/manager/updManager.php`, formData)
            if(response?.data?.result === true) {
                alert(response?.data?.resultMsg); onRequestClose()
            }else{
                alert(response?.data?.resultMsg)
            }
        }
    }
    console.log(data)
    useEffect(() => {
        async function getDetail () {
            if(id !== 0) {
                const response = await api.get(`/admin/manager/getManagerDetail.php?ID=${id}`)
                if(response?.data?.result === true) {
                    if(response?.data?.List?.length > 0) {
                        setData(response?.data?.List[0])
                    }
                }
            }else{
                setData({
                    ID : 0 , activeStatus : '', managerDept : '', managerEmail : '', managerLogin : '', managerMobile : '',
                    managerName : '', managerPhone : '', managerPosition : '' , managerPass : '', managerPassConfirm : ''
                })
            }
        }
        getDetail()
    }, [id])
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel={id ? '관리자 수정' : '관리자 신규 등록'}
        >
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h2>{contentLabel}</h2>
                    <button onClick={onRequestClose} className="modal-close-button">Close</button>
                </div>
                <div className="modal-content">
                    <table className="table4">
                        <tbody>
                        <tr>
                            <th scope="row">이름 <span>*</span></th>
                            <td>
                                <input type="text" name='managerName' value={data?.managerName} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">부서 <span>*</span></th>
                            <td>
                                <input type="text" name='managerDept' value={data?.managerDept} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">아이디 <span>*</span></th>
                            <td>
                                <input type="text" name='managerLogin' value={data?.managerLogin} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">이메일 <span>*</span></th>
                            <td>
                                <input type="text" name='managerEmail' value={data?.managerEmail} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">휴대전화 <span>*</span></th>
                            <td>
                                <input type="text" name='managerPhone' value={data?.managerPhone} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">전화번호 <span>*</span></th>
                            <td>
                                <input type="text" name='managerMobile' value={data?.managerMobile} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">비밀번호 <span>*</span></th>
                            <td>
                                <input type="password" name='managerPass' value={data?.managerPass} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">비밀번호 확인 <span>*</span></th>
                            <td>
                                <input type="password" name='managerPassConfirm' value={data?.managerPassConfirm} onChange={handleChange}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className='btns7'>
                    <button onClick={()=>Save()}>저장</button>
                </div>
            </div>
        </Modal>
    );
};

export default SettingModal;
