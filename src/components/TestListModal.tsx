import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import TestDetailModal from '@/components/TestDetailModal';
import TestRegistModal from '@/components/TestRegistModal';
import api from '@/lib/api';
import { useAuth } from './Context/AuthContext';

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

interface DataType {
    ID : string, activeStatus : string, assembleId : string, assembleName : string, assembleNotes : object, assemblePart : string,
    createDate : string, replyCnt : string, shipTypeId : string, inspectionResult : string, inspectionSubject : string,
    managerName : string, userName : string
}

const TestListModal: React.FC<CustomModalProps> = ({ shipId , assembleId , isOpen, onRequestClose, contentLabel }) => {
    const {part} = useAuth()
    const [data , setData] = useState<DataType[]>([])
    const [listId, setListId] = useState<string>('')
    console.log(part)
    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);

    const openModal1 = (e : React.MouseEvent, listId : string) => {
        e.preventDefault()
        if(listId) {
            setListId(listId)
        }
        setModalIsOpen1(true);
    };

    const openModal2 = (e:React.MouseEvent, listId: string) => {
        e.preventDefault()
        setListId(listId)
        setModalIsOpen2(true);
    };

    const closeModal = () => {
        setListId('')
        setModalIsOpen1(false);
        setModalIsOpen2(false);
    };

    async function getList () {
        try {
            if(isOpen) {
                const encodedPart = encodeURIComponent(part);
                const response = await api.get(`/admin/projects/getInspectionList.php?shipTypeId=${shipId}&assembleId=${assembleId}&assembleParts=${encodedPart}&page=1&size=10`)
                if(response?.data?.result === true) {
                    setData(response?.data?.List)
                }
            }
        }catch{alert('Server Error')}
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
                        <h2><span>S11C-GR0A</span> {contentLabel}
                            <button onClick={(e)=>openModal2(e, '')}><Image src="/images/register-button.png" alt="리스트 추가" width={20} height={20}/></button>
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
                                <th scope="col">검사제목</th>
                                <th scope="col">검사일자</th>
                                <th scope="col">검사자</th>
                                <th scope="col">검사결과</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.map((list:DataType, index:number) => {
                                return(
                                    <>
                                    <tr key={index}>
                                        <td><a href="#" onClick={(e) => openModal1(e, list?.ID)}>{list?.inspectionSubject}</a></td>
                                        <td>{list?.createDate}</td>
                                        <td>{list?.managerName}</td>
                                        <td>
                                            {list?.inspectionResult === 'Y' && '양호'}
                                            {list?.inspectionResult === 'N' && '불량'}
                                            {list?.inspectionResult === 'R' && '재제작'}
                                        </td>
                                        <td className='action'>
                                            <a href={"#"}><Image src="/images/file-import.svg" alt="파일 삽입" width={20} height={20}/></a>
                                            <a href={"#"}><Image src="/images/write.svg" alt="작성" width={20} height={20}/></a>
                                            <label className="toggle_switch" style={{marginRight: '10px'}}>
                                                <input
                                                    type="checkbox"
                                                    checked={list?.activeStatus === 'Y'}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                            <a href={"#"} onClick={(e) => openModal2(e, list?.ID)}><Image src="/images/file-import.svg" alt="파일 삽입" width={20} height={20}/></a>
                                        </td>
                                    </tr>
                                    </>
                                )
                            })}
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
            <TestDetailModal
                listId={listId}
                isOpen={modalIsOpen1}
                onRequestClose={closeModal}
                contentLabel="검사 리스트 상세"
            />
            <TestRegistModal 
                listId={listId}
                shipId={shipId}
                assembleId={assembleId}
                refetch={getList}
                isOpen={modalIsOpen2}
                onRequestClose={closeModal}
                contentLabel="검사 리스트 등록"
            />
        </>
    );
};

export default TestListModal;
