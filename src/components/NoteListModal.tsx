'use client'
import React, {useEffect, useRef, useState} from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import NoteDetailModal from '@/components/NoteDetailModal';
import NoteRegistModal from '@/components/NoteRegistModal';
import api from '@/lib/api';
import PopupPaginate from './Paginate/popup-paginate';
import { FileDownLoadBtn, FileDownLoadLink } from './FileDownLoadBtn';

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
    assembleId : string | Blob;
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
}

interface DataType {
    ID : string, activeStatus : string , createDate : string ,
    managerId : string, managerName : string , smContents : string ,
    smFile : string, smFilename : string
}

const NoteListModal: React.FC<CustomModalProps> = ({ assembleId, isOpen, onRequestClose, contentLabel }) => {
    const keywordRef = useRef<any>(null)
    const [data , setData] = useState<DataType[]>([])
    const [subMaterialId , setSubMaterialId] = useState<string>('')
    const [totalCount , setTotalCount] = useState<number>(0)
    const [page , setPage] = useState<number>(0)
    const [keyword , setKeyword] = useState<string>('')

    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);

    const openModal1 = (subMaterialId : string) => {
        setSubMaterialId(subMaterialId)
        if(subMaterialId){setModalIsOpen1(true);}
    };

    const openModal2 = (subMaterialId : string) => {
        if(subMaterialId){
            setSubMaterialId(subMaterialId)
        }
        setModalIsOpen2(true);
    };

    const closeModal = () => {
        setSubMaterialId('')
        setModalIsOpen1(false);
        setModalIsOpen2(false);
    };

    function Search () {
        setKeyword(keywordRef.current.value)
    }
    function Enter (e:React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter') {Search()}
    }

    async function getList () {
        if(isOpen){
            const response = await api.get(`/admin/projects/getSubsidaryMaterialList.php?assembleId=${assembleId}&smfilename=${keyword}&page=1&size=10&sortColumn=smFilename&sortOrder=desc`)
            setData(response?.data?.List); setTotalCount(response?.data?.totalCnt)
        }
    }

    async function changeStatus (id: string , status: string) {
        const formData = new FormData()
        formData.append('ID' , id)
        formData.append('activeStatus' , status === 'Y' ? 'N' : 'Y')
        const response = await api.post(`/admin/projects/updSubsidaryMaterialStatus.php`, formData)
        if(response?.data?.result === true) {getList()}
        else{alert(response?.data?.resultMsg)}
    }

    useEffect(() => {
        getList()
    }, [isOpen, page, keyword])
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
                        <h2>{contentLabel} - S11C-DK1A <button onClick={() => openModal2('')}><Image src="/images/register-button.png" alt="리스트 추가" width={20} height={20}/></button></h2>
                        <button onClick={onRequestClose} className="modal-close-button">Close</button>
                    </div>
                    <div className="modal-content">
                        <ul className="note-list">
                            <li>
                                <div className="note-list-detail">
                                    텍스트<br/>
                                    텍스트<br/>
                                    텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트
                                    텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트
                                </div>
                                <div className="note-date">
                                    <div>
                                        <p>2024.08.30</p>
                                        <p>홍길동</p>
                                    </div>
                                    <button onClick={() => openModal1(1)}>상세보기</button>
                                </div>
                            </li>
                            <li>
                                <div className="note-list-detail">
                                    텍스트
                                </div>
                                <div className="note-date">
                                    <div>
                                        <p>2024.08.30</p>
                                        <p>홍길동</p>
                                    </div>
                                    <button>상세보기</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal>
            <NoteDetailModal
                subMaterialId={subMaterialId}
                isOpen={modalIsOpen1}
                onRequestClose={closeModal}
                contentLabel="노트 리스트 상세"
            />
            <NoteRegistModal
                subMaterialId={subMaterialId}
                assembleId={assembleId}
                isOpen={modalIsOpen2}
                onRequestClose={closeModal}
                refetch={getList}
                contentLabel="노트"
            />
        </>
    );
};

export default NoteListModal;
