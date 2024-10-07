'use client';

import React, { useState } from "react";
import { useAuth } from "./Context/AuthContext";
import SubsidaryListModal from "@/components/SubsidaryListModal";
import RequiredListModal from "@/components/RequiredListModal";
import MachiningListModal from "@/components/MachiningListModal";
import WorkListModal from "@/components/WorkListModal";
import TestListModal from "@/components/TestListModal";
import NoteListModal from "@/components/NoteListModal";
import NoteRegistModal from "@/components/NoteRegistModal";
import TestRegistModal from "@/components/TestRegistModal";

interface Props {
    id : string
    type : string | Blob
    shipId : string
}
export default function Footer({id , type, shipId} : Props) {
    const {part} = useAuth()
    // const parts = sessionStorage.getItem('parts') || '';
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const toggleActive = (index: number) => {
        if (activeItem === index) {
            setActiveItem(null);
        } else {
            setActiveItem(index);
        }
    };

    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [modalIsOpen3, setModalIsOpen3] = useState(false);
    const [modalIsOpen4, setModalIsOpen4] = useState(false);
    const [modalIsOpen5, setModalIsOpen5] = useState(false);
    const [modalIsOpen6, setModalIsOpen6] = useState(false);
    const [modalIsOpen7, setModalIsOpen7] = useState(false);
    const [modalIsOpen8, setModalIsOpen8] = useState(false);

    const openModal1 = () => {
        setModalIsOpen1(true);
    };

    const openModal2 = () => {
        setModalIsOpen2(true);
    };

    const openModal3 = () => {
        setModalIsOpen3(true);
    };

    const openModal4 = () => {
        setModalIsOpen4(true);
    };

    const openModal5 = () => {
        if(part){
            setModalIsOpen5(true);
        }else{
            alert('부품을 선택해 주세요.'); return;
        }
    };

    const openModal8 = () => {
        if(part) {
            setModalIsOpen8(!modalIsOpen8);
        }else{
            alert('부품을 선택해 주세요.'); return;
        }
    };

    const openModal6 = () => {
        setModalIsOpen6(!modalIsOpen6);
    };

    const openModal7 = () => {
        if(part) {
            setModalIsOpen7(!modalIsOpen7);
        }else{
            alert('부품을 선택해 주세요.'); return;
        }
    };


    const closeModal = () => {
        setModalIsOpen1(false);
        setModalIsOpen2(false);
        setModalIsOpen3(false);
        setModalIsOpen4(false);
        setModalIsOpen5(false);
        setModalIsOpen6(false);
        setModalIsOpen7(false);
        setModalIsOpen8(false);
    };

    return (
        <footer>
            <ul>
                {type === 'assemble' &&
                    <>
                        <li className={`bom ${activeItem === 0 ? 'active' : ''}`}>
                            <button onClick={() => toggleActive(0)}>BOM</button>
                            <ul>
                                <li>
                                    <button onClick={openModal1}>부자재</button>
                                </li>
                                <li>
                                    <button onClick={openModal2}>소요강재표</button>
                                </li>
                            </ul>
                        </li>
                        <li className={`manage ${activeItem === 1 ? 'active' : ''}`}>
                            <button onClick={() => toggleActive(1)}>도면관리</button>
                            <ul>
                                <li>
                                    <button onClick={openModal3}>가공도</button>
                                </li>
                                <li>
                                    <button onClick={openModal4}>공작도</button>
                                </li>
                            </ul>
                        </li>
                    </>
                }
                <li className={`camera ${activeItem === 3 ? 'active' : ''}`}>
                    <button onClick={() => toggleActive(3)}>검사 관리</button>
                    <ul>
                        <li>
                            <button onClick={openModal5}>검사리스트</button>
                        </li>
                        <li>
                            <button onClick={openModal8}>검사등록</button>
                        </li>
                    </ul>
                </li>
                <li className={`note ${activeItem === 2 ? 'active' : ''}`}>
                    <button onClick={() => toggleActive(2)}>노트</button>
                    <ul>
                        <li>
                            <button onClick={openModal6}>노트리스트</button>
                        </li>
                        <li>
                            <button onClick={openModal7}>노트등록</button>
                        </li>
                    </ul>
                </li>
            </ul>
            <SubsidaryListModal
                assembleId={id}
                isOpen={modalIsOpen1}
                onRequestClose={closeModal}
                contentLabel="부자재 리스트 관리"
            />
            <RequiredListModal
                assembleId={id}
                isOpen={modalIsOpen2}
                onRequestClose={closeModal}
                contentLabel="소요강재 리스트 관리"
            />
            <MachiningListModal
                assembleId={id}
                isOpen={modalIsOpen3}
                onRequestClose={closeModal}
                contentLabel="가공도 리스트 관리"
            />
            <WorkListModal
                assembleId={id}
                isOpen={modalIsOpen4}
                onRequestClose={closeModal}
                contentLabel="공작도 리스트 관리"
            />

            <TestListModal
                shipId={shipId}
                assembleId={id}
                isOpen={modalIsOpen5}
                onRequestClose={closeModal}
                contentLabel="검사리스트"
            />
            <TestRegistModal
                shipId={shipId}
                isOpen={modalIsOpen8}
                onRequestClose={closeModal}
                contentLabel="검사 리스트 등록" 
                listId={""} 
                assembleId={id} 
                refetch={undefined} 
            />

            <NoteListModal
                shipId={shipId} // 선종 ID
                assembleId={id} // 대조 아이디
                isOpen={modalIsOpen6}
                onRequestClose={closeModal}
                contentLabel="노트 리스트"
            />

            <NoteRegistModal
                shipId={shipId}
                assembleId={id}
                isOpen={modalIsOpen7}
                refetch={undefined} 
                onRequestClose={closeModal}
                contentLabel="노트 등록"
            />
        </footer>
    )
}
