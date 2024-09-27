'use client'
import Image from "next/image";
interface Props {
    fileName : string | undefined
    file : string | undefined
}

export function FileDownLoadBtn ({
    fileName , file
} : Props) {
    function download (e:React.MouseEvent<HTMLElement>) {
        if(!file) {
            e.preventDefault()
            alert('등록된 파일이 없습니다.'); return;
        }
    }
    return <a style={{cursor : 'pointer'}} onClick={download} href={file} target={file ? "_blank" : ''}><Image src="/images/download.svg" alt="다운로드" width={20} height={20}/></a>
}

export function FileDownLoadLink ({
    fileName , file
} : Props) {
    function downloadLink (e:React.MouseEvent<HTMLElement>) {
        if(!file) {
            e.preventDefault()
            alert('등록된 파일이 없습니다.'); return;
        }
    }

    return <td><a style={{cursor : 'pointer'}} onClick={downloadLink} href={file} target="_blank">{fileName ? fileName : '-'}</a></td>
}