import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import Dropzone from "@/components/Dropzone";
import api from '@/lib/api';
import Editorjs from './EditorJs';

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
    managerName : string, userName : string
}

const TestDetailModal: React.FC<CustomModalProps> = ({ listId , isOpen, onRequestClose, contentLabel }) => {
    const [data , setData] = useState<DataType>()
    const [initData , setInitData] = useState<any>()
    const [editor , setEditor] = useState<any>(null)
    useEffect(() => {
        async function getDetail () {
            if(isOpen && listId){
                const response = await api.get(`/admin/projects/getInspectionDetail.php?ID=${listId}`)
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
                    <div className="change-reason2">
                        <h3>검사 제목</h3>
                        <p>{data?.inspectionSubject}</p>
                    </div>

                    <div className="change-reason2">
                        <h3>검사 내용</h3>
                        <Editorjs
                            isEdit={false}
                            initData={initData}
                            setInitData={setInitData}
                            setData={setEditor}
                            placeholder={'내용 없음'}
                        />
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
                </div>
            </div>
        </Modal>
    );
};

export default TestDetailModal;
