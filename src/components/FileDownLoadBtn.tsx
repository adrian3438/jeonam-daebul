'use client'
import Image from "next/image";
interface Props {
    fileName : string | undefined
    file : string | undefined
}
export default function FileDownLoadBtn ({
    fileName , file
} : Props) {
    function download () {
        if(!file) {
            alert('등록된 파일이 없습니다.'); return;
        }
    }
    return <a style={{cursor : 'pointer'}} onClick={download} href={file} target="_blank"><Image src="/images/download.svg" alt="다운로드" width={20} height={20}/></a>
}