import React, {useState} from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import TestDetailModal from '@/components/TestDetailModal';
import TestRegistModal from '@/components/TestRegistModal';

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
    shipId : string
    assembleId : string
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
}

const TestListModal: React.FC<CustomModalProps> = ({ shipId , assembleId , isOpen, onRequestClose, contentLabel }) => {
    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);

    const openModal1 = () => {
        setModalIsOpen1(true);
    };

    const openModal2 = () => {
        setModalIsOpen2(true);
    };

    const closeModal = () => {
        setModalIsOpen1(false);
        setModalIsOpen2(false);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                style={customStyles}
                contentLabel={contentLabel}
            >
                <div className="modal-wrapper">
                    <div className="modal-header">
                        <h2><span>S11C-GR0A</span> {contentLabel}
                            <button onClick={openModal2}><Image src="/images/register-button.png" alt="리스트 추가" width={20} height={20}/></button>
                        </h2>
                        <div className="modal-search">
                            <input type="text" maxLength={50}/>
                            <input type="button" value={"검색"} className="search-btn"/>
                        </div>
                        <button onClick={onRequestClose} className="modal-close-button">Close</button>
                    </div>
                    <div className="modal-content">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">검사이미지</th>
                                <th scope="col">검사제목</th>
                                <th scope="col">검사일자</th>
                                <th scope="col">검사자</th>
                                <th scope="col">검사결과</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><Image src="/images/@temp/test-sample-img.jpg" alt="이미지" width={144} height={85}/></td>
                                <td><a href="#" onClick={openModal1}>Pre-eletion 검사</a></td>
                                <td>2024-07-15</td>
                                <td>홍길동</td>
                                <td>양호</td>
                                <td className='action'>
                                    <label className="toggle_switch" style={{marginRight: '10px'}}>
                                        <input type="checkbox"/>
                                        <span className="slider"></span>
                                    </label>
                                    <a href={"#"}><Image src="/images/file-import.svg" alt="파일 삽입" width={20} height={20}/></a>
                                </td>
                            </tr>
                            <tr>
                                <td><Image src="/images/@temp/test-sample-img.jpg" alt="이미지" width={144} height={85}/></td>
                                <td><a href="#" onClick={openModal1}>Pre-eletion 검사</a></td>
                                <td>2024-07-15</td>
                                <td>홍길동</td>
                                <td className="error">불량</td>
                                <td className='action'>
                                    <label className="toggle_switch" style={{marginRight:'10px'}}>
                                        <input type="checkbox"/>
                                        <span className="slider"></span>
                                    </label>
                                    <a href={"#"}><Image src="/images/file-import.svg" alt="파일 삽입" width={20} height={20}/></a>
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
            <TestDetailModal isOpen={modalIsOpen1} onRequestClose={closeModal} contentLabel="검사 리스트 상세"/>
            <TestRegistModal isOpen={modalIsOpen2} onRequestClose={closeModal} contentLabel="검사 리스트 등록"/>
        </>
    );
};

export default TestListModal;
