import React, {useState} from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import Link from "next/link";

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
}

const SettingModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, contentLabel }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel={contentLabel}
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
                                <input type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">부서 <span>*</span></th>
                            <td>
                                <input type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">아이디 <span>*</span></th>
                            <td>
                                <input type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">이메일 <span>*</span></th>
                            <td>
                                <input type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">휴대전화 <span>*</span></th>
                            <td>
                                <input type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">전화번호 <span>*</span></th>
                            <td>
                                <input type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">비밀번호 <span>*</span></th>
                            <td>
                                <input type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">비밀번호 확인 <span>*</span></th>
                            <td>
                                <input type="text"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className='btns7'>
                    <button>저장</button>
                </div>
            </div>
        </Modal>
    );
};

export default SettingModal;
