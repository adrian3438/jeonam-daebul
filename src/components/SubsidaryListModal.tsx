'use client'
import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import SubsidaryDetailModal from '@/components/SubsidaryDetailModal';
import SubsidaryRegistModal from '@/components/SubsidaryRegistModal';
import api from '@/lib/api';
import PopupPaginate from './Paginate/popup-paginate';

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

const SubsidaryListModal: React.FC<CustomModalProps> = ({ assembleId, isOpen, onRequestClose, contentLabel }) => {

    const [subMaterialId , setSubMaterialId] = useState<string>('')
    const [totalCount , setTotalCount] = useState<number>(0)
    const [page , setPage] = useState<number>(0)

    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);

    const openModal1 = (subMaterialId : string) => {
        setSubMaterialId(subMaterialId)
        if(subMaterialId){setModalIsOpen1(true);}
    };

    const openModal2 = () => {
        setModalIsOpen2(true);
    };

    const closeModal = () => {
        setSubMaterialId('')
        setModalIsOpen1(false);
        setModalIsOpen2(false);
    };

    async function getList () {
        if(isOpen){
            const response = await api.get(`/admin/projects/getSubsidaryMaterialList.php?assembleId=${assembleId}&smfilename=&page=1&size=10&sortColumn=smFilename&sortOrder=desc`)
            
        }
    }
    useEffect(() => {
        getList()
    }, [isOpen, page])
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
                                    {/* 다운로드 */}
                                    <a href={"#"}><Image src="/images/download.svg" alt="다운로드" width={20} height={20}/></a>
                                    {/* 상세보기 */}
                                    <a style={{cursor : 'pointer'}} onClick={() => openModal1('1')}><Image src="/images/file-import.svg" alt="파일 삽입" width={20} height={20}/></a>
                                    {/* 수정하기 */}
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
                        <PopupPaginate
                            page={page}
                            setPage={setPage}
                            size={10}
                            totalCount={totalCount}
                        />
                    </div>
                </div>
            </Modal>
            <SubsidaryDetailModal 
            subMaterialId={subMaterialId}
            isOpen={modalIsOpen1} 
            onRequestClose={closeModal} 
            contentLabel="부자재 리스트 상세" 
            />
            <SubsidaryRegistModal
            assembleId={assembleId}
            isOpen={modalIsOpen2}
            onRequestClose={closeModal}
            refetch={getList}
            contentLabel="부자재 등록"
            />
        </>
    );
};

export default SubsidaryListModal;
