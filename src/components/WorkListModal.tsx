import React from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';

const customStyles = {
    content: {
        top: '50%',
        left: 'auto',
        right: '10px',
        bottom: 'auto',
        width: '100vh',
        height: '70vh',
        transform: 'translate(0, -50%)',
    },
};

interface CustomModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
}

const WorkListModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, contentLabel }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel={contentLabel}
        >
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h2>{contentLabel}
                        <button><Image src="/images/register-button.png" alt="리스트 추가" width={20} height={20}/></button>
                    </h2>
                    <button onClick={onRequestClose} className="modal-close-button">Close</button>
                </div>
                <div className="modal-content">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">파일명</th>
                            <th scope="col">등록일자</th>
                            <th scope="col">등록자</th>
                            <th scope="col">변경사항</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>JA003-S11C-부재표-REV2</td>
                            <td>2024-07-15</td>
                            <td>홍길동</td>
                            <td className="change">텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.</td>
                            <td className='action'>
                                <a href={"#"}><Image src="/images/download.svg" alt="다운로드" width={20} height={20}/></a>
                                <a href={"#"}><Image src="/images/file-import.svg" alt="파일 삽입" width={20} height={20}/></a>
                                <a href={"#"}><Image src="/images/write.svg" alt="작성" width={20} height={20}/></a>
                                <label className="toggle_switch">
                                    <input type="checkbox"/>
                                    <span className="slider"></span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>JA003-S11C-부재표-REV2</td>
                            <td>2024-07-15</td>
                            <td>홍길동</td>
                            <td className="change">텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.텍스트가 들어갑니다.</td>
                            <td className='action'>
                                <a href={"#"}><Image src="/images/download.svg" alt="다운로드" width={20} height={20}/></a>
                                <a href={"#"}><Image src="/images/file-import.svg" alt="파일 삽입" width={20} height={20}/></a>
                                <a href={"#"}><Image src="/images/write.svg" alt="작성" width={20} height={20}/></a>
                                <label className="toggle_switch">
                                    <input type="checkbox"/>
                                    <span className="slider"></span>
                                </label>
                            </td>
                        </tr>
                        {/* 리스트 없을 시 <tr>
                            <td colSpan={5}>내용이 없습니다.</td>
                        </tr>*/}
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer">
                    <a href="#">&lt; Prev</a>
                    <a href="#" className="active">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">Next &gt;</a>
                </div>
            </div>
        </Modal>
    );
};

export default WorkListModal;
