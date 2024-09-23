import React from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';

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

const TestRegistModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, contentLabel }) => {
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
                        <input type="text"/>
                    </div>

                    <div className="change-reason2">
                        <h3>검사 사진 업로드</h3>
                        <input type="file"/>
                        <div className="picture-upload">
                            <p>
                                <Image src="/images/@temp/upload-sample.jpg" alt="사진" width={122} height={96}/>
                                <button><Image src="/images/close-button.png" alt="삭제" width={20} height={20}/></button>
                            </p>
                            <p>
                                <Image src="/images/@temp/upload-sample.jpg" alt="사진" width={122} height={96}/>
                                <button><Image src="/images/close-button.png" alt="삭제" width={20} height={20}/></button>
                            </p>
                            <p>
                                <Image src="/images/@temp/upload-sample.jpg" alt="사진" width={122} height={96}/>
                                <button><Image src="/images/close-button.png" alt="삭제" width={20} height={20}/></button>
                            </p>
                            <p>
                                <Image src="/images/@temp/upload-sample.jpg" alt="사진" width={122} height={96}/>
                                <button><Image src="/images/close-button.png" alt="삭제" width={20} height={20}/></button>
                            </p>
                            <p>
                                <Image src="/images/@temp/upload-sample.jpg" alt="사진" width={122} height={96}/>
                                <button><Image src="/images/close-button.png" alt="삭제" width={20} height={20}/></button>
                            </p>
                        </div>
                    </div>


                    <div className="change-reason2">
                        <h3>변경 사유</h3>
                        <textarea>
                            수정인 경우 내용이 있습니다.
                        </textarea>
                    </div>

                    <div className="change-reason2">
                        <h3>검사 결과</h3>
                        <div className="result-choice">
                            <label><input type="radio" name="result" checked={true} id="radio1"/> 양호</label>
                            <label><input type="radio" name="result" id="radio2"/> 불량</label>
                            <label><input type="radio" name="result" id="radio3"/> 재제작 필요</label>
                        </div>
                    </div>

                    <div className='btns5'>
                        <button>저장</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TestRegistModal;
