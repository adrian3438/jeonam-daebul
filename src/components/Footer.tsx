'use client';

import SubsidaryListModal from "@/components/SubsidaryListModal";
import RequiredListModal from "@/components/RequiredListModal";

import { useState } from "react";
import MachiningListModal from "@/components/MachiningListModal";
import WorkListModal from "@/components/WorkListModal";
import TestListModal from "@/components/TestListModal";
import { useAuth } from "./Context/AuthContext";
interface Props {
    id : string | Blob
    type : string | Blob
}
export default function Footer({id , type} : Props) {
    const {part} = useAuth()
    console.log(part)
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

    const closeModal = () => {
        setModalIsOpen1(false);
        setModalIsOpen2(false);
        setModalIsOpen3(false);
        setModalIsOpen4(false);
        setModalIsOpen5(false);
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
                <li className="camera">
                    <button onClick={openModal5}>검사 관리</button>
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
            <TestListModal isOpen={modalIsOpen5} onRequestClose={closeModal} contentLabel="검사리스트"/>
        </footer>
    )
}