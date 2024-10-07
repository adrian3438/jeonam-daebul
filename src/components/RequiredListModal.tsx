'use client'
import React, {useEffect, useRef, useState} from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import RequiredDetailModal from "@/components/RequiredDetailModal";
import RequiredRegistModal from "@/components/RequiredRegistModal";
import api from '@/lib/api';
import Paginate from './Paginate/pagination';
import PopupPaginate from './Paginate/popup-paginate';
import { FileDownLoadBtn, FileDownLoadLink } from './FileDownLoadBtn';

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
    assembleId : string | Blob
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
}

interface DataType {
    ID : string , activeStatus : string ,
    createDate : string, maangerId : string,
    managerName : string, rsContents : string,
    rsFile : string , rsFilename : string, googleUrl : string
}

const RequiredListModal: React.FC<CustomModalProps> = ({ assembleId, isOpen, onRequestClose, contentLabel }) => {
    const keywordRef = useRef<any>(null)
    const [listId , setListId] = useState<string>('')
    const [data , setData] = useState<DataType[]>([])
    const [totalCount , setTotalCount] = useState<number>(0)
    const [page , setPage] = useState<number>(1)
    const [keyword , setKeyword] = useState<string>('')
    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);

    const openModal1 = (id : string) => {
        setListId(id)
        setModalIsOpen1(true);
    };

    const openModal2 = (id : string) => {
        if(id) {
            setListId(id)
        }
            setModalIsOpen2(true);
    };

    const closeModal = () => {
        setListId('')
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
            const response = await api.get(`/admin/projects/getRequiredSteelList.php?assembleId=${assembleId}&rsfilename=${keyword}&page=${page}&size=10&sortColumn=rsFilename&sortOrder=desc`)
            if(response?.data?.result === true) {
                setData(response?.data?.List); setTotalCount(response?.data?.totalCnt)
            }
        }
    }

    async function changeStatus (id: string | Blob , status: string) {
        const formData = new FormData()
        formData.append('ID' , id)
        formData.append('activeStatus' , status === 'Y' ? 'N' : 'Y')
        const response = await api.post(`/admin/projects/updRequiredSteelStatus.php`, formData)
        if(response?.data?.result === true) {getList()}
        else{alert(response?.data?.resultMsg)}
    }

    function handleGoogleLink ( e: React.MouseEvent, url : string ) {
        e.preventDefault()
        if(url) {
            window.open(url)
        }else {alert('URL이 등록되지 않았습니다.'); return;}
    }

    useEffect(()=> {
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
                        <h2>{contentLabel}
                            <button onClick={() => openModal2('')}><Image src="/images/register-button.png" alt="리스트 추가" width={20} height={20}/></button>
                        </h2>
                        <div className="search-bar-area2" style={{marginBottom: 0}}>
                            <div className="search-bar">
                                <input ref={keywordRef} onKeyDown={(e) => Enter(e)} type="text" maxLength={50}/>
                                <input type="button" value={"검색"} onClick={Search} className="search-btn"/>
                            </div>
                            <button onClick={onRequestClose} className="modal-close-button">Close</button>
                        </div>
                        {/*<div className="modal-search">
                            <input ref={keywordRef} onKeyDown={(e) => Enter(e)} type="text" maxLength={50}/>
                            <input type="button" value={"검색"} onClick={Search} className="search-btn"/>
                        </div>
                        <button onClick={onRequestClose} className="modal-close-button">Close</button>*/}
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
                            {data?.length > 0 ?
                            <>
                            {data?.map((list:DataType ,index:number) => (
                                <tr key={index}>
                                    <FileDownLoadLink
                                        file={list?.rsFile}
                                        fileName={list?.rsFilename}
                                    />
                                    <td>{list?.createDate}</td>
                                    <td>{list?.managerName}</td>
                                    <td className="change">{list?.rsContents}</td>
                                    <td className='action'>
                                        <a href="#" onClick={(e)=>handleGoogleLink(e, list?.googleUrl)}><Image src="/images/google-drive.svg" alt="링크" width={20} height={20}/></a>
                                        <FileDownLoadBtn
                                            file={list?.rsFile}
                                            fileName={list?.rsFilename}
                                        />
                                        <a style={{cursor : 'pointer'}} onClick={() => openModal1(list?.ID)}><Image src="/images/file-import.svg" alt="파일 삽입" width={20} height={20}/></a>
                                        <a style={{cursor : 'pointer'}} onClick={()=>openModal2(list?.ID)}><Image src="/images/write.svg" alt="작성" width={20} height={20}/></a>
                                        <label className="toggle_switch">
                                            <input
                                                type="checkbox"
                                                checked={list?.activeStatus === 'Y'}
                                                onChange={()=>changeStatus(list?.ID, list?.activeStatus)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                            </>
                            :
                            <tr>
                                <td colSpan={5}>내용이 없습니다.</td>
                            </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <PopupPaginate
                            page={page}
                            setPage={setPage}
                            size={10}
                            totalCount={totalCount}
                        />
                    </div>
                </div>
            </Modal>
            <RequiredDetailModal
                listId={listId}
                isOpen={modalIsOpen1}
                onRequestClose={closeModal}
                contentLabel="소요강재 리스트 상세"
            />
            <RequiredRegistModal
                listId={listId}
                assembleId={assembleId}
                isOpen={modalIsOpen2}
                refetch={getList}
                onRequestClose={closeModal}
                contentLabel={listId ? '소요강재 수정' : '소요강재 등록'}
            />
        </>
    );
};

export default RequiredListModal;
