'use client'
import React, { useEffect, useRef, useState } from 'react';
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
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '740px',
        height: '386px',
        transform: 'translate(-50%, -50%)',
        zIndex : '9999'
    },
};

interface DataType {
    subject: string
}

interface CustomModalProps {
    listId : string
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
}

const NoteReplyRegistModal: React.FC<CustomModalProps> = ({ listId, isOpen, onRequestClose, contentLabel }) => {
    const {authData} = useAuth()
    const replyRef = useRef<any>(null)
    async function Save () {
        if(!replyRef?.current?.value) { alert('답글을 입력해주세요.'); return; }
        const formData = new FormData()
        formData.append('noteId', listId)
        formData.append('managerId', authData?.data?.ID)
        formData.append('noteReply', replyRef.current.value)
        const response = await api.post(`/admin/projects/setAssembleNoteReply.php` , formData)
        if(response?.data?.result === true) {
            // refetch 들어와야함
            onRequestClose()
            alert(response?.data?.resultMsg)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel={contentLabel}
        >
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h2><span className="title-detail">홍길동</span></h2>
                    <button onClick={onRequestClose} className="modal-close-button">Close</button>
                </div>
                <div className="modal-content">
                    <div className="change-reason4">
                        <textarea ref={replyRef} style={{height: '200px'}}></textarea>
                        <div className='btns7'>
                            <button onClick={Save}>저장</button>
                        </div>
                    </div>
                </div>

            </div>
        </Modal>
    );
};

export default NoteReplyRegistModal;
