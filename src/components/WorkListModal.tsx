import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import WorkDetailModal from "@/components/WorkDetailModal";
import WorkRegistModal from "@/components/WorkRegistModal";
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
    assembleId : string | Blob
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
}

interface DataType {
    ID : string , activeStatus : string , 
    createDate : string, maangerId : string,
    managerName : string, wdContents : string,
    wdFile : string , wdFilename : string
}

const WorkListModal: React.FC<CustomModalProps> = ({ assembleId, isOpen, onRequestClose, contentLabel }) => {

    const [listId , setListId] = useState<string>('')
    const [data , setData] = useState<DataType[]>([])
    const [totalCount , setTotalCount] = useState<number>(0)
    const [page , setPage] = useState<number>(1)

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
        setListId('')
        setModalIsOpen1(false);
        setModalIsOpen2(false);
    };

    async function getList () {
        if(isOpen){
            const response = await api.get(`/admin/projects/getWorkDrawingList.php?assembleId=${assembleId}&mdfilename=&page=${page}&size=10&sortColumn=rsFilename&sortOrder=desc`)
            if(response?.data?.result === true) {
                setData(response?.data?.List); setTotalCount(response?.data?.totalCnt)
            }
        }
    }

    async function changeStatus (id: string | Blob , status: string) {
        const formData = new FormData()
        formData.append('ID' , id)
        formData.append('activeStatus' , status === 'Y' ? 'N' : 'Y')
        const response = await api.post(`/admin/projects/updWorkDrawingStatus.php`, formData)
        if(response?.data?.result === true) {getList()}
        else{alert(response?.data?.resultMsg)}
    }

    useEffect(()=> {
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
                            <button onClick={()=>openModal2('')}><Image src="/images/register-button.png" alt="리스트 추가" width={20} height={20}/></button>
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
                            {data?.length > 0 ? 
                            <>
                            {data?.map((list:DataType ,index:number) => (
                                <tr key={index}>
                                    <td>{list?.wdFilename ? list?.wdFilename : '-'}</td>
                                    <td>{list?.createDate}</td>
                                    <td>{list?.managerName}</td>
                                    <td className="change">{list?.wdContents}</td>
                                    <td className='action'>
                                        <a href={"#"}><Image src="/images/download.svg" alt="다운로드" width={20} height={20}/></a>
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
            <WorkDetailModal 
                listId={listId}
                isOpen={modalIsOpen1} 
                onRequestClose={closeModal} 
                contentLabel="공작도 리스트 상세" 
            />
            <WorkRegistModal 
                listId={listId}
                assembleId={assembleId}
                isOpen={modalIsOpen2} 
                onRequestClose={closeModal} 
                refetch={getList}
                contentLabel="공작도 등록" 
            />
        </>
    );
};

export default WorkListModal;
