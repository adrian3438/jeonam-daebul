'use client'
import React, { useEffect, useState } from 'react';
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
    assembleId : string | Blob
    isOpen: boolean;
    onRequestClose: () => void;
    refetch : Function;
    contentLabel: string;
}

interface DataType {
    smFile : File | Blob | null
    smContents : string
}

const SubsidaryRegistModal: React.FC<CustomModalProps> = ({ assembleId, isOpen, refetch, onRequestClose, contentLabel }) => {
    const {authData} = useAuth()

    const [data , setData] = useState<DataType>({
        smFile : null , smContents : ''
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
            setData((prev) => ({...prev, smFile : file}))
            setFileName(file.name as string)
            setPreview(reader.result as string)
        }
    };
    async function Save () {
        try {
            const formData = new FormData()
            formData.append('assembleId', assembleId)
            formData.append('managerId', authData?.data?.ID)
            formData.append('managerName', authData?.data?.name)
            if(data?.smFile){
                formData.append('smFile', data?.smFile)
            }
            formData.append('smContents' , data?.smContents)
            const response = await api.post(`/admin/projects/setSubsidaryMaterial.php`, formData)
            if(response?.data?.result === true) {
                alert(response?.data?.resultMsg); onRequestClose(); refetch()
            }
        }catch {alert('Server Error')}
    }

    useEffect(()=> {
        setData({smFile : null , smContents : ''})
        setFileName('')
        setPreview('')
    }, [isOpen])

    
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
                    {/*<div>
                        <input type="file"/>
                    </div>*/}
                    <div className="change-reason">
                        <Dropzone onFileAccepted={handleFileAccepted}/>
                        <p className="uploaded-img">
                            {preview && 
                            <Image src={preview} alt="대조" width={81} height={23}/>
                            }
                            <span>{fileName}</span>
                        </p>
                    </div>

                    <div className="change-reason">
                        <h3>변경 사유</h3>
                        <textarea name='smContents' value={data?.smContents} onChange={handleChange}>
                            
                        </textarea>
                        <div className='btns4'>
                            <button onClick={Save}>저장</button>
                        </div>
                    </div>
                </div>

            </div>
        </Modal>
    );
};

export default SubsidaryRegistModal;
