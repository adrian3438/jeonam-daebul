import React from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import Dropzone from "@/components/Dropzone";

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
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
}

const WorkRegistModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, contentLabel }) => {
    const handleFileAccepted = (acceptedFiles: File[]) => {
        console.log('Accepted files: ', acceptedFiles);
    };

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
                    <div className="change-reason">
                        <Dropzone onFileAccepted={handleFileAccepted}/>
                        <p className="uploaded-img">
                            <Image src="/images/@temp/uploaded-img-sample.jpg" alt="대조" width={81} height={23}/>
                            <span>test-shi9p01.jpg</span>
                        </p>
                    </div>

                    <div className="change-reason">
                        <h3>변경 사유</h3>
                        <textarea>
                            수정인 경우 내용이 있습니다.
                        </textarea>
                        <div className='btns4'>
                            <button>저장</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default WorkRegistModal;
