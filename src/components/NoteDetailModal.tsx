import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import api from '@/lib/api';
import {FileDownLoadBtn} from './FileDownLoadBtn';
import dynamic from 'next/dynamic';
import NoteReplyRegistModal from "@/components/NoteReplyRegistModal";
import NoteReplyListModal from "@/components/NoteReplyListModal";
const Editorjs = dynamic(() => import('@/components/EditorJs'), {ssr : false})

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
    ID : string, activeStatus : string , createDate : string ,
    managerId : string, managerName : string , smContents : string ,
    smFile : string, smFilename : string
}

const SubsidaryDetailModal: React.FC<CustomModalProps> = ({ listId, isOpen, onRequestClose, contentLabel }) => {
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

    const [data, setData] = useState<DataType>()
    useEffect(() => {
        async function getDetail () {
            if(isOpen && listId){
                const response = await api.get(`/admin/projects/getSubsidaryMaterialDetail.php?ID=${listId}`)
                if(response?.data?.result === true) {
                    if(response?.data?.List.length > 0){
                        setData(response?.data?.List[0])
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
                        <h2>{contentLabel}</h2>
                        <button onClick={onRequestClose} className="modal-close-button">Close</button>
                    </div>
                    <div className="modal-content modal-content2">
                        <div className="change-reason4">
                            <div>
                            {/* <Editorjs
                                isEdit={false}
                            /> */}
                            </div>
                            <div className='btns8'>
                                <button className="reply-list" onClick={() => openModal1()}>답변글 : 3</button>
                                <button className="reply-write" onClick={() => openModal2()}>댓글달기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <NoteReplyListModal
                isOpen={modalIsOpen1}
                onRequestClose={closeModal}
                contentLabel="답글 리스트"
            />

            <NoteReplyRegistModal
                isOpen={modalIsOpen2}
                onRequestClose={closeModal}
                contentLabel=""
            />
        </>
    );
};

export default SubsidaryDetailModal;
