import { useCallback } from 'react';
import { useDropzone, FileRejection, Accept } from 'react-dropzone';

interface DropzoneProps {
    onFileAccepted: (acceptedFiles: File[]) => void;
    accept?: Accept;
    fileType : string
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileAccepted, accept, fileType }) => {
    const getAccept = (fileType: string): Accept => {
        switch (fileType) {
            case 'image':
                return {
                    'image/png': [],
                    'image/jpeg': [],
                };
            case 'pdf&xlsx&xls':
                return {
                    'application/pdf': ['.pdf'],
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                    'application/vnd.ms-excel': ['.xls'],
                };
            default:
                return {};
        }
    };
    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        // 받아들여진 파일들을 처리
        if (acceptedFiles.length > 0) {
            onFileAccepted(acceptedFiles);
        }

        // 거절된 파일들을 처리 (옵션)
        if (rejectedFiles.length > 0) {
            console.error('Rejected files: ', rejectedFiles);
            alert(`${fileType}만 업로드 가능합니다.`)
        }
    }, [onFileAccepted]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: getAccept(fileType),
    });

    return (
        <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>파일을 여기에 놓으세요...</p>
            ) : (
                <p>파일을 마우스로 끌어서 올리거나 <span>여기</span>를 클릭하여 파일을 업로드 합니다.</p>
            )}
        </div>
    );
};

export default Dropzone;