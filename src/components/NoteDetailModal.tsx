import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import api from '@/lib/api';
import {FileDownLoadBtn} from './FileDownLoadBtn';
import dynamic from 'next/dynamic';
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
                    <div className="change-reason4">
                        <div>
                        <Editorjs 
                            isEdit={false}
                        />
                        </div>
                        <div className='btns7'>
                            <button>수정</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SubsidaryDetailModal;
