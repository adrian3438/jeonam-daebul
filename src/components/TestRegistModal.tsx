import React, { useState } from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import Dropzone from "@/components/Dropzone";
import Editorjs from './EditorJs';
import { useAuth } from './Context/AuthContext';
import api from '@/lib/api';

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

interface DataType {
    subject: string
    reason : string
    result : string
}

interface CustomModalProps {
    shipId : string
    assembleId : string
    refetch  :any
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
}

const TestRegistModal: React.FC<CustomModalProps> = ({ shipId , assembleId, refetch, isOpen, onRequestClose, contentLabel }) => {
    const {authData , part} = useAuth()
    const [initData , setInitData] = useState<any>()
    const [editor , setEditor] = useState<any>(null)
    const [data, setData] = useState<DataType>({
        subject : '', reason : '', result : 'Y'
    })
    function handleChange (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name , value} = e.target;
        setData((prev) => ({...prev, [name] : value}))
    }
    async function Save () {
        try {
            if(!data?.subject) {alert('검사 제목을 입력해 주세요.'); return;}
            const formData = new FormData()
            formData.append('shipTypeId', shipId)
            formData.append('assembleId' , assembleId)
            formData.append('managerId', authData?.data?.ID)
            formData.append('assembleParts', part)
            formData.append('inspectionSubject', data?.subject)
            formData.append('inspectionContents', JSON.stringify(editor))
            formData.append('inspectionOpinion', data?.reason)
            formData.append('inspectionResult', data?.result)
            const response = await api.post(`/admin/projects/setInspection.php`, formData)
            if(response?.data?.result === true) {
                alert(response?.data?.resultMsg)
                onRequestClose()
                refetch()
            }
        }catch {alert('Server Error')}
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
                    <h2>{contentLabel}</h2>
                    <button onClick={onRequestClose} className="modal-close-button">Close</button>
                </div>
                <div className="modal-content">
                    <div className="change-reason2">
                        <h3>검사 제목</h3>
                        <input type="text" name='subject' value={data?.subject} onChange={handleChange}/>
                    </div>

                    <div className="change-reason2">
                        <h3>검사 내용</h3>
                        <Editorjs
                            isEdit={true}
                            initData={initData}
                            setInitData={setInitData}
                            setData={setEditor}
                            placeholder={'검사 내용을 입력해 주세요.'}
                        />
                    </div>


                    <div className="change-reason2">
                        <h3>변경 사유</h3>
                        <textarea placeholder='변경사유를 입력해 주세요.' name='reason' value={data?.reason} onChange={handleChange}>
                            
                        </textarea>
                    </div>

                    <div className="change-reason2">
                        <h3>검사 결과</h3>
                        <div className="result-choice">
                            <label><input type="radio" onChange={handleChange} value={'Y'} name="result" checked={data?.result === 'Y'} id="radio1"/> 양호</label>
                            <label><input type="radio" onChange={handleChange} value={'N'} name="result" checked={data?.result === 'N'} id="radio2"/> 불량</label>
                            <label><input type="radio" onChange={handleChange} value={'R'} name="result" checked={data?.result === 'R'} id="radio3"/> 재제작 필요</label>
                        </div>
                    </div>

                    <div className='btns5'>
                        <button onClick={Save}>저장</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TestRegistModal;
