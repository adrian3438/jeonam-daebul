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
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '740px',
        height: '657px',
        transform: 'translate(-50%, -50%)',
        zIndex : '9999'
    },
};

interface DataType {
    subject: string
}

interface CustomModalProps {
    listId?: string
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
}

const NoteReplyListModal: React.FC<CustomModalProps> = ({ listId, isOpen, onRequestClose, contentLabel }) => {
    

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel={contentLabel}
        >
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h2><span style={{color: "black"}}>{contentLabel}</span></h2>
                    <div className="search-bar-area2" style={{marginBottom: 0}}>
                        <div className="search-bar">
                            <input type="text" maxLength={50}/>
                            <input type="button" className="search-btn"/>
                        </div>
                        <button onClick={onRequestClose} className="modal-close-button">Close</button>
                    </div>
                </div>
                <div className="modal-content modal-content3">
                    <ul className={`reply-list-modal`}>
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
                </div>

            </div>
        </Modal>
    );
};

export default NoteReplyListModal;
