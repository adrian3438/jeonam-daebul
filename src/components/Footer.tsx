'use client';

import CustomModal from "@/app/components/CustomModal";
import { useState } from "react";

export default function Footer() {
    const [activeItem, setActiveItem] = useState<number | null>(null);

    const toggleActive = (index: number) => {
        if (activeItem === index) {
            setActiveItem(null);
        } else {
            setActiveItem(index);
        }
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
        setContentLabel('test');
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const [contentLabel, setContentLabel] = useState<string>('');

    return (
        <footer>
            <ul>
                <li className={`bom ${activeItem === 0 ? 'active' : ''}`}>
                    <button onClick={() => toggleActive(0)}>BOM</button>
                    <ul>
                        <li>
                            <button onClick={openModal}>부자재</button>
                        </li>
                        <li>
                            <button>소요강재표</button>
                        </li>
                    </ul>
                </li>
                <li className={`manage ${activeItem === 1 ? 'active' : ''}`}>
                    <button onClick={() => toggleActive(1)}>도면관리</button>
                    <ul>
                        <li>
                            <button>가공도</button>
                        </li>
                        <li>
                            <button>공작도</button>
                        </li>
                    </ul>
                </li>
                <li className="camera">
                    <button>검사 관리</button>
                </li>
            </ul>

            <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel={contentLabel}/>
        </footer>
    )
}