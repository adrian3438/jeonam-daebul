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
    listId : string
    assembleId : string | Blob
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
    refetch : () => void
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
                formData.append('mdfile', data?.mdFile)
            }
            formData.append('mdContents' , data?.mdContents)
            if(listId){
                const response = await api.post(`/admin/projects/updMachiningDrawing.php`, formData)
                if(response?.data?.result === true) {
                    alert(response?.data?.resultMsg); onRequestClose(); refetch()
                }else{alert(response?.data?.resultMsg)}
            }else{
                const response = await api.post(`/admin/projects/setMachiningDrawing.php`, formData)
                if(response?.data?.result === true) {
                    alert(response?.data?.resultMsg); onRequestClose(); refetch()
                }else{alert(response?.data?.resultMsg)}
            }
        }catch {alert('Server Error')}
    }

    async function getDetail() {
        if(listId && isOpen){
            const response = await api.get(`/admin/projects/getMachiningDrawingDetail.php?ID=${listId}`)
            if(response?.data?.result === true) {
                if(response?.data?.List?.length > 0) {
                    const result = response?.data?.List[0]
                    setData((prev) => ({...prev , mdContents : result?.mdContents}))
                    setFileName(result?.mdFilename)
                }
            }
        }
    }

    useEffect(()=> {
        if(listId) {
            getDetail()
        }else{
            setData({mdFile : null , mdContents : ''})
            setFileName('')
        }
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
                    <div className="change-reason">
                        <Dropzone onFileAccepted={handleFileAccepted} fileType='pdf'/>
                        <p className="uploaded-img">
                            <span>{fileName}</span>
                        </p>
                    </div>

                    <div className="change-reason">
                        <h3>변경 사유</h3>
                        <textarea name='mdContents' value={data?.mdContents} onChange={handleChange}>
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

export default MachiningRegistModal;
