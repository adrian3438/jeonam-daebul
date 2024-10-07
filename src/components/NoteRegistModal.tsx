'use client'
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import Dropzone from "@/components/Dropzone";
import { useAuth } from './Context/AuthContext';
import api from '@/lib/api';
import dynamic from 'next/dynamic';
import zIndex from '@mui/material/styles/zIndex';
// const Editorjs = dynamic(() => import('@/components/EditorJs'), {ssr : true})
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
        zIndex : '9999'
    },
};

interface DataType {
    subject: string
}

interface CustomModalProps {
    shipId : string
    listId?: string
    assembleId : string
    refetch : any
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
}

const NoteRegistModal: React.FC<CustomModalProps> = ({ shipId, listId, assembleId, refetch, isOpen, onRequestClose, contentLabel }) => {
    const {authData, part} = useAuth()
    
    const [data, setData] = useState<DataType>({
        subject : ''
    })
    const [initData , setInitData] = useState<any>()
    const [editor , setEditor] = useState<any>(null)
    async function Save () {
        try {
            const formData = new FormData()
            if(listId) {formData.append('ID', listId)}
            formData.append('shipTypeId' , shipId)
            formData.append('assembleId', assembleId)
            formData.append('managerId', authData?.data?.ID)
            formData.append('assembleParts', part)
            formData.append('assembleNoteSubject', data?.subject)
            formData.append('assembleNotes', editor ? JSON.stringify(editor) : '' )
            if(listId) {
                const response = await api.post(`/admin/projects/updAssembleNotes.php`, formData)
                if(response?.data?.result === true) {
                    alert(response?.data?.resultMsg);
                    onRequestClose(); refetch()
                }
            }else{
                const response = await api.post(`/admin/projects/setAssembleNotes.php`, formData)
                if(response?.data?.result === true) {
                    alert(response?.data?.resultMsg);
                    onRequestClose(); refetch()
                }
            }
        }catch {
        }
    }
    async function getDetail () {
        if(isOpen && listId){
            const response = await api.get(`/admin/projects/getAssembleNoteDetail.php?ID=${listId}`)
            if(response?.data?.result === true) {
                if(response?.data?.List.length > 0){
                    const result = response?.data?.List[0];
                    setData((prev) => ({...prev, subject : result?.assembleNoteSubject
                    }))
                    setInitData(result?.assembleNotes)
                }
            }
        }
    }
    useEffect(() => {
        if(listId){getDetail()}
        else{
            setData({subject : ''})
            setInitData(null)
        }
    }, [isOpen])

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel={contentLabel}
        >
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h2>{contentLabel} <span className="title-detail">기록할 내용을 입력해주세요.</span></h2>
                    <button onClick={onRequestClose} className="modal-close-button">Close</button>
                </div>
                <div className="modal-content">
                    <div>
                        <input type="text" value={data?.subject} onChange={(e)=>setData((prev) => ({...prev, subject: e.target.value}))} placeholder='제목을 입력하세요.'/>
                    </div>
                    <div className="change-reason4">
                        {initData &&
                        <Editorjs 
                            isEdit={true}
                            initData={initData}
                            setInitData={setInitData}
                            setData={setEditor}
                            placeholder={'노트 내용을 입력해 주세요.'}
                        />
                        }
                        {!initData &&
                        <Editorjs 
                            isEdit={true}
                            initData={null}
                            setInitData={setInitData}
                            setData={setEditor}
                            placeholder={'노트 내용을 입력해 주세요.'}
                        />
                        }
                        <div className='btns7'>
                            <button onClick={Save}>저장</button>
                        </div>
                    </div>
                </div>

            </div>
        </Modal>
    );
};

export default NoteRegistModal;
