import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import Dropzone from "@/components/Dropzone";
import api from '@/lib/api';
import Editorjs from './EditorJs';
import { json } from 'stream/consumers';
import TestReplyRegistModal from './TestReplyRegistModal';

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
    listId : string
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
}

interface DataType {
    ID : string, activeStatus : string, assembleId : string, assembleName : string, assembleNotes : object, assemblePart : string,
    createDate : string, replyCnt : string, shipTypeId : string, inspectionResult : string, inspectionSubject : string,
    managerName : string, userName : string, inspectionContents : any
}

const TestDetailModal: React.FC<CustomModalProps> = ({ listId , isOpen, onRequestClose, contentLabel }) => {
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

    const [data , setData] = useState<DataType>()
    const [initData , setInitData] = useState<any>(null)
    const [editor , setEditor] = useState<any>(null)
    useEffect(() => {
        async function getDetail () {
            setInitData(null);
            if(isOpen && listId){
                const response = await api.get(`/admin/projects/getInspectionDetail.php?ID=${listId}`)
                if(response?.data?.result === true) {
                    if(response?.data?.List.length > 0){
                        setData(response?.data?.List[0])
                        setInitData(response?.data?.List[0]?.inspectionContents)
                    }
                }
            }
        }
        getDetail()
    }, [isOpen && listId])
    
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
                        <h2>{contentLabel} {listId ? `(${data?.assemblePart})` : ''}</h2>
                        <button onClick={onRequestClose} className="modal-close-button">Close</button>
                    </div>
                    <div className="modal-content modal-content2">
                        <div className="change-reason2">
                            <h3>검사 제목</h3>
                            <p>{data?.inspectionSubject}</p>
                        </div>

                    <div className="change-reason2">
                        <h3>검사 내용</h3>
                        {initData &&
                        <Editorjs
                            isEdit={false}
                            initData={initData}
                            setInitData={setInitData}
                            setData={setEditor}
                            placeholder={''}
                        />
                        }
                    </div>


                        <div className="change-reason2">
                            <h3>변경 사유</h3>
                            <p>
                                수정인 경우 내용이 있습니다.
                            </p>
                        </div>

                        <div className="change-reason2">
                            <h3>검사 결과</h3>
                            <p>
                                {data?.inspectionResult === 'Y' && '양호'}
                                {data?.inspectionResult === 'N' && '불량'}
                                {data?.inspectionResult === 'R' && '재제작'}
                            </p>
                        </div>

                        <div className='btns8'>
                            <button className="reply-list" onClick={() => openModal1()}>답변글 : 3</button>
                            <button className="reply-write" onClick={() => openModal2()}>댓글달기</button>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* <TestReplyListModal
                isOpen={modalIsOpen1}
                onRequestClose={closeModal}
                contentLabel="답글 리스트"
            /> */}

            <TestReplyRegistModal
                listId={listId}
                isOpen={modalIsOpen2}
                onRequestClose={closeModal}
                contentLabel=""
            />
        </>
    );
};

export default TestDetailModal;
