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
    subMaterialId : string
    assembleId : string | Blob
    isOpen: boolean;
    onRequestClose: () => void;
    refetch : () => void;
    contentLabel: string;
}

interface DataType {
    smFile : File | Blob | null
    smContents : string
    googleUrl : string
}

const SubsidaryRegistModal: React.FC<CustomModalProps> = ({ subMaterialId, assembleId, isOpen, refetch, onRequestClose, contentLabel }) => {
    const {authData} = useAuth()

    const [data , setData] = useState<DataType>({
        smFile : null , smContents : '', googleUrl : ''
    })
    const [fileName , setFileName] = useState<string>('')
    const [preview , setPreview] = useState<string>('')
    function handleChange (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
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
            if(subMaterialId) {formData.append('ID', subMaterialId)}
            formData.append('assembleId', assembleId)
            formData.append('managerId', authData?.data?.ID)
            formData.append('managerName', authData?.data?.name)
            if(data?.smFile){
                formData.append('smFile', data?.smFile)
            }
            formData.append('smContents' , data?.smContents)
            formData.append('googleUrl' , data?.googleUrl)
            if(subMaterialId){
                const response = await api.post(`/admin/projects/updSubsidaryMaterial.php`, formData)
                if(response?.data?.result === true) {
                    alert(response?.data?.resultMsg); onRequestClose(); refetch()
                }else{
                    alert(response?.data?.resultMsg)
                }
            }else{
                const response = await api.post(`/admin/projects/setSubsidaryMaterial.php`, formData)
                if(response?.data?.result === true) {
                    alert(response?.data?.resultMsg); onRequestClose(); refetch()
                }else{
                    alert(response?.data?.resultMsg)
                }
            }
        }catch {alert('Server Error')}
    }

    async function getDetail () {
        if(isOpen && subMaterialId){
            const response = await api.get(`/admin/projects/getSubsidaryMaterialDetail.php?ID=${subMaterialId}`)
            if(response?.data?.result === true) {
                if(response?.data?.List.length > 0){
                    const result = response?.data?.List[0]
                    setData((prev) => ({...prev, smContents : result?.smContents, googleUrl : result?.googleUrl}))
                    setPreview(result?.smFile)
                    setFileName(result?.smFilename)
                }
            }
        }
    }

    useEffect(()=> {
        if(subMaterialId) {
            getDetail()
        }else{
            setData({smFile : null , smContents : '', googleUrl : ''})
            setFileName('')
            setPreview('')
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
                    {/*<div>
                        <input type="file"/>
                    </div>*/}
                    <div className="change-reason">
                        <Dropzone onFileAccepted={handleFileAccepted} fileType='pdf&xlsx&xls'/>
                        <p className="uploaded-img">
                            {/* {preview &&
                            <Image src={preview} alt="대조" width={81} height={23}/>
                            } */}
                            <span>{fileName}</span>
                        </p>
                    </div>

                    <div className="change-reason">
                        <h3>구글 Link</h3>
                        <input type="text" name='googleUrl' value={data?.googleUrl} onChange={handleChange} className="input-google-link"/>
                    </div>

                    <div className="change-reason">
                        <h3>변경 사유</h3>
                        <textarea name='smContents' value={data?.smContents} onChange={handleChange}>

                        </textarea>
                        <div className='btns6'>
                            <button onClick={Save}>저장</button>
                        </div>
                    </div>
                </div>

            </div>
        </Modal>
    );
};

export default SubsidaryRegistModal;
