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

const TestDetailModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, contentLabel }) => {
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
                    <table className="table2">
                        <tbody>
                        <tr>
                            <th scope="row">파일명</th>
                            <td>JA003-S11C-부재표-REV2 <a href="#"><Image src="/images/download.svg" alt="다운로드" width={25} height={25}/></a></td>
                            <th scope="row">Version</th>
                            <td>version3</td>
                        </tr>
                        <tr>
                            <th scope="row">등록자</th>
                            <td>홍길동</td>
                            <th scope="row">등록일자</th>
                            <td>2024-08-31</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="change-reason">
                        <h3>변경 사유</h3>
                        <div>
                            변경 사유가 들어갑니다.
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TestDetailModal;
