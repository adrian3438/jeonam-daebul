import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import '@/app/assets/modal.scss';
import api from '@/lib/api';
import {FileDownLoadBtn} from './FileDownLoadBtn';

const customStyles = {
    content: {
        top: '50%',
        left: 'auto',
        right: '10px',
        bottom: 'auto',
        width: '100vh',
        height: '95vh',
        transform: 'translate(0, -50%)',
        padding: '40px 50px'
    },
};

interface CustomModalProps {
    listId : string
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
}

interface DataType {
    ID : string | Blob, activeStatus : string ,
    createDate : string, maangerId : string,
    managerName : string, rsContents : string,
    rsFile : string , rsFilename : string, googleUrl : string
}

const RequiredDetailModal: React.FC<CustomModalProps> = ({ listId , isOpen, onRequestClose, contentLabel }) => {
    const [data , setData] = useState<DataType>()
    useEffect(() => {
        async function getDetail() {
            if(listId && isOpen){
                const response = await api.get(`/admin/projects/getRequiredSteelDetail.php?ID=${listId}`)
                if(response?.data?.result === true) {
                    if(response?.data?.List?.length > 0) {
                        setData(response?.data?.List[0])
                    }
                }
            }
        }
        getDetail()
    }, [listId, isOpen])
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
                    <table className="table3">
                        <tbody>
                        <tr>
                            <th scope="row">파일명</th>
                            <td>{data?.rsFilename ? data?.rsFilename : '-'}
                                {data?.rsFile &&
                                    <FileDownLoadBtn
                                        file={data?.rsFile}
                                        fileName={data?.rsFilename}
                                    />
                                }
                            </td>
                            <th scope="row">Version</th>
                            <td>-</td>
                        </tr>
                        <tr>
                            <th scope="row">등록자</th>
                            <td>{data?.managerName}</td>
                            <th scope="row">등록일자</th>
                            <td>{data?.createDate}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="change-reason change-reason3">
                        <h3>구글 Link</h3>
                        <div>
                            {data?.googleUrl && <a href={data?.googleUrl} target='_blank'>{data?.googleUrl}</a>}
                        </div>
                    </div>

                    <div className="change-reason change-reason3">
                        <h3>변경 사유</h3>
                        <div>
                            {data?.rsContents}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default RequiredDetailModal;
