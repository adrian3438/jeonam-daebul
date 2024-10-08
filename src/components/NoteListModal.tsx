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
import { useAuth } from './Context/AuthContext';

const customStyles = {
    content: {
        top: '50%',
        left: 'auto',
        right: '10px',
        bottom: 'auto',
        width: '100vh',
        height: '95vh',
        transform: 'translate(0, -50%)',
        padding: '40px 50px'
    },
};


interface CustomModalProps {
    name : string
    shipId : string
    assembleId : string
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
}


const NoteListModal: React.FC<CustomModalProps> = ({ name, shipId, assembleId, isOpen, onRequestClose, contentLabel }) => {
    const {part} = useAuth()
    const keywordRef = useRef<any>(null)
    const [data , setData] = useState<any>([])
    const [listId , setListId] = useState<string>('')
    const [totalCount , setTotalCount] = useState<number>(0)
    const [page , setPage] = useState<number>(0)
    const [keyword , setKeyword] = useState<string>('')

    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);

    const [replyIndex, setReplyIndex] = useState<number>();
    const [replyOpen, setReplyOpen] = useState<boolean>(false);

    const openModal1 = (listId : string) => {
        setListId(listId)
        if(listId){setModalIsOpen1(true);}
    };

    const openModal2 = (listId : string) => {
        if(listId){
            setListId(listId)
            setModalIsOpen2(true);
        }else{
            if(part) {
                setModalIsOpen2(true);
            }else{
                alert('부품을 선택해 주세요.')
            }
        }
    };

    const closeModal = () => {
        setListId('')
        setModalIsOpen1(false);
        setModalIsOpen2(false);
    };

    const openReply = (index:number) => {
        setReplyIndex(index);
        if(replyOpen) {
            setReplyOpen(false);
        } else {
            setReplyOpen(true);
        }
    }

    function Search () {
        setKeyword(keywordRef.current.value)
    }
    function Enter (e:React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter') {Search()}
    }

    async function getList () {
        if(isOpen){
            const encodedPart = encodeURIComponent(part);
            const response = await api.get(`/admin/projects/getAssembleNoteList.php?shipTypeId=${shipId}&assembleId=${assembleId}&assembleParts=${encodedPart}&page=1&size=10`)
            if(response?.data?.result === true) {
                setData(response?.data?.List)
            }
        }
    }

    useEffect(() => {
        getList()
    }, [isOpen])
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
                        <h2>{contentLabel} - {name} <button onClick={() => openModal2('')}><Image src="/images/register-button.png" alt="리스트 추가" width={20} height={20}/></button></h2>
                        <button onClick={onRequestClose} className="modal-close-button">Close</button>
                    </div>
                    <div className="modal-content">
                        <ul className="note-list">
                            {data?.map((list: any, index: number) => {
                                return (
                                    <>
                                        <li key={index}>
                                            <div>
                                                <div className="note-list-detail">
                                                    <p>{list?.assembleNoteSubject}</p>
                                                    <p>{list?.assemblePart}</p>
                                                </div>
                                                <div className="note-date">
                                                    <div className="write-info">
                                                        <p>{list?.createDate}</p>
                                                        <p>{list?.managerName}</p>
                                                        <button onClick={() => openReply(index)}>답변글 : {list?.replyCnt}</button>
                                                    </div>
                                                    <div className="note-btns">
                                                        <button onClick={() => openModal2(list?.ID)}>수정</button>
                                                        <button onClick={() => openModal1(list?.ID)}>상세보기</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className={`reply-list ${replyIndex === index && replyOpen ? 'active' : ''}`}>
                                                <li>
                                                    <span className="bar"></span>
                                                    <div className="reply">
                                                        <div className="reply-info">
                                                            <p className="reply-wirter">홍길동</p>
                                                            <p className="reply-date">2024-10-07</p>
                                                        </div>
                                                        <div className="reply-detail">
                                                            댓글이 들어갑니다.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <span className="bar"></span>
                                                    <div className="reply">
                                                        <div className="reply-info">
                                                            <p className="reply-wirter">홍길동</p>
                                                            <p className="reply-date">2024-10-07</p>
                                                        </div>
                                                        <div className="reply-detail">
                                                            댓글이 들어갑니다.
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </Modal>
            <NoteDetailModal
                listId={listId}
                isOpen={modalIsOpen1}
                onRequestClose={closeModal}
                contentLabel="노트 상세 내용"
            />
            <NoteRegistModal
                shipId={shipId}
                listId={listId}
                assembleId={assembleId}
                refetch={getList}
                isOpen={modalIsOpen2}
                onRequestClose={closeModal}
                contentLabel="노트"
            />
        </>
    );
};

export default NoteListModal;
