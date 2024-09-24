import React, { useState } from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import Dropzone from "@/components/Dropzone";
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

interface CustomModalProps {
    listId : string
    assembleId : string | Blob
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
    refetch : Function
}

interface DataType {
    mdFile : File | Blob | null
    mdContents : string
}

const MachiningRegistModal: React.FC<CustomModalProps> = ({ listId , assembleId , isOpen, onRequestClose, contentLabel, refetch }) => {
    const {authData} = useAuth()
    const [data , setData] = useState<DataType>({
        mdFile : null , mdContents : ''
    }) 
    const [fileName , setFileName] = useState<string>('')
    const [preview , setPreview] = useState<string>('')
    function handleChange (e:React.ChangeEvent<HTMLTextAreaElement>) {
        setData((prev) => ({...prev, [e.target.name] : e.target.value}))
    }
    const handleFileAccepted = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        const reader = new FileReader()
        if(file) { reader.readAsDataURL(file)}
        reader.onload = () => {
            setData((prev) => ({...prev, mdFile : file}))
            setFileName(file.name as string)
            setPreview(reader.result as string)
        }
    };
    async function Save () {
        try {
            const formData = new FormData()
            if(listId) {formData.append('ID', listId)}
            formData.append('assembleId', assembleId)
            formData.append('managerId', authData?.data?.ID)
            formData.append('managerName', authData?.data?.name)
            if(data?.mdFile){
                formData.append('rsFile', data?.mdFile)
            }
            formData.append('rsContents' , data?.mdContents)
            if(listId){
                const response = await api.post(`/admin/projects/updRequiredSteel.php`, formData)
                if(response?.data?.result === true) {
                    alert(response?.data?.resultMsg); onRequestClose(); refetch()
                }else{alert(response?.data?.resultMsg)}
            }else{
                const response = await api.post(`/admin/projects/setRequiredSteel.php`, formData)
                if(response?.data?.result === true) {
                    alert(response?.data?.resultMsg); onRequestClose(); refetch()
                }else{alert(response?.data?.resultMsg)}
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

export default MachiningRegistModal;
