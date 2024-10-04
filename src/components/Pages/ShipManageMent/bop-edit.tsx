'use client'
import Dropzone from "@/components/Dropzone";
import api from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface Props {
    id : string | Blob
    assembleid : any
    bopid : string |Blob
}
interface DataType {
    mainImage : File | Blob | null , bopName : string , bopNotes : string,
    jsonFile : File | Blob | null , binFile : File | Blob | null, xvlFile : File | Blob | null,
    modelingUrl : string
}
interface FileNameType {
    mainImage : string, jsonFile : string , binFile : string, xvlFile : string
}
export default function BopEditBox ({
    // id : 선종 아이디
    // assembleid : 대조 아이디
    id , assembleid, bopid
} : Props) {
    const router = useRouter()
    const [data , setData] = useState<DataType>({
        mainImage : null, bopName : '', bopNotes : '',
        jsonFile : null, binFile : null, xvlFile : null, modelingUrl : ''
    })
    const [preview , setPreview] = useState<string>('')
    const [fileName , setFileName] = useState<FileNameType>({
        mainImage : '', jsonFile : '', binFile : '', xvlFile : ''
    })
    function handleChange (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {type , name , value} = e.target;
        if(type === 'file' && e.target instanceof HTMLInputElement && e.target.files && e.target.files[0]) {
            const files = e.target.files;
            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = () => {
                setData((prev) => ({...prev, [name] : files[0]}))
                setFileName((prev) => ({...prev, [name] : files[0].name as string}))
            }
        }else{
            setData((prev) => ({...prev, [name] : value}))
        }
    }

    const handleFileAccepted = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const reader = new FileReader()
        if(file) { reader.readAsDataURL(file) }
        reader.onload = () => {
            setData((prev) => ({...prev, mainImage : acceptedFiles[0]}))
            setPreview(reader.result as string)
            setFileName((prev) => ({...prev, mainImage : acceptedFiles[0].name as string}))
        }
    };

    async function Save () {
        if(!fileName?.mainImage) {alert('BOP 대표 이미지를 업로드 해주세요.'); return;}
        if(!data?.bopName) {alert('BOP 명을 입력해 주세요.'); return;}
        if(!data?.bopNotes) {alert('BOP 특이사항을 입력해 주세요.'); return;}
        const formData = new FormData()
        if(bopid === 'regist') {
            formData.append('assembleId', assembleid)
        }else{
            formData.append('ID', bopid)
        }
        formData.append('bopNameKr', data?.bopName)
        formData.append('bopFeatures', data?.bopNotes)
        formData.append('modelingUrl', data?.modelingUrl)
        if(data?.mainImage){formData.append('thumnailImage', data?.mainImage)}
        if(data?.jsonFile){formData.append('bopJsonFile', data?.jsonFile)}
        if(data?.binFile){formData.append('bopBinFile', data?.binFile)}
        if(data?.xvlFile){formData.append('bopXvlFile', data?.xvlFile)}
        if(bopid === 'regist') {
            const response = await api.post(`/admin/setup/setShipBop.php` , formData)
            if(response?.data?.result === true) {
                alert(response?.data?.resultMsg);router.push(`/ship-manage/${id}`)
            }else {alert(response?.data?.resultMsg)}
        }else{
            const response = await api.post(`/admin/setup/updShipBop.php` , formData)
            if(response?.data?.result === true) {
                alert(response?.data?.resultMsg);router.push(`/ship-manage/${id}`)
            }else {alert(response?.data?.resultMsg)}
        }
    }

    useEffect(()=>{
        async function getDetail () {
            if(bopid !== 'regist'){
                const response = await api.get(`/admin/setup/getBopDetail.php?ID=${bopid}`)
                if(response?.data?.result === true){
                    if(response?.data?.List?.length > 0) {
                        const result = response?.data?.List[0]
                        setData((prev) => ({...prev, bopName : result?.bopName, bopNotes : result?.bopFeatures, modelingUrl : result?.modelingUrl}))
                        setFileName((prev) => ({...prev , mainImage: result?.thumnailFilename, jsonFile : result?.jsonFilename,
                        binFile : result?.binFilename, xvlFile : result?.xvlFilename}))
                        setPreview(result?.thumnailFile)
                    }
                }
            }
        }
        getDetail()
    },[])
    return(
        <>
        <div className="bop-manage-regist">
            <section>
                <div>
                    <h2>BOP 대표 이미지 (<span>*</span>)</h2>
                    {/* <input type="file" name="mainImage" onChange={handleChange}/> */}
                    <Dropzone onFileAccepted={handleFileAccepted} fileType='image'/>
                    <p className="uploaded-img">
                        {preview && <Image src={preview} alt="대조" width={81} height={23}/>}
                        <span>{fileName?.mainImage}</span>
                    </p>
                </div>
                <div>
                    <h2>BOP명 (<span>*</span>)</h2>
                    <input type="text" name="bopName" value={data?.bopName} onChange={handleChange} className="ship-name"/>
                </div>
                <div>
                    <h2>BOP 특이사항 (<span>*</span>)</h2>
                    <textarea name="bopNotes" value={data?.bopNotes} onChange={handleChange}></textarea>
                </div>
            </section>
            <section>
                <div>
                    <h2>모델링 파일</h2>
                    <div>
                        <div>
                            <p><label>JSON</label><input type="file" name="jsonFile" onChange={handleChange}/></p>
                            <p>{fileName?.jsonFile}</p>
                        </div>
                        <div>
                            <p><label>BIN</label><input type="file" name="binFile" onChange={handleChange}/></p>
                            <p>{fileName?.binFile}</p>
                        </div>
                        <div>
                            <p><label>XVL</label><input type="file" name="xvlFile" onChange={handleChange}/></p>
                            <p>{fileName?.xvlFile}</p>
                        </div>
                    </div>
                </div>
                <div className="url-regist">
                    <h2>모델링 URL</h2>
                    <input type="text" name="modelingUrl" value={data?.modelingUrl} onChange={handleChange}/>
                </div>
            </section>
        </div>
            <div className="btns2">
                <button onClick={() =>Save()}>저장</button>
        </div>
        </>
    )
}
