'use client'
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import Dropzone from "@/components/Dropzone";
import { useAuth } from './Context/AuthContext';
import api from '@/lib/api';
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
    shipId : string
    listId : string
    assembleId : string | Blob
    isOpen: boolean;
    onRequestClose: () => void;
    refetch : () => void;
    contentLabel: string;
}

const NoteRegistModal: React.FC<CustomModalProps> = ({ shipId, listId, assembleId, isOpen, refetch, onRequestClose, contentLabel }) => {
    const {authData} = useAuth()

    const [data, setData] = useState<any>({
        subject : '', note : null
    })

    function Save () {

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
                    <h2>{contentLabel} <span className="title-detail">기록할 내용을 입력해주세요.</span></h2>
                    <button onClick={onRequestClose} className="modal-close-button">Close</button>
                </div>
                <div className="modal-content">
                    <div>
                        <input type="text" placeholder='제목을 입력하세요.'/>
                    </div>
                    <div className="change-reason4">
                        <Editorjs 
                            isEdit={true}
                        />
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
