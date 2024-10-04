'use client'
import Image from "next/image";
import Dropzone from "@/components/Dropzone";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
interface Props {
    id : string | Blob
    assembleid : string | Blob
}
interface DataType {
    mainImage : File | Blob | null , assembleName : string, assembleNotes : string,
    jsonFile : File | Blob | null , binFile : File | Blob | null, xvlFile : File | Blob | null,
    partners : string[]
}
interface PartnerCompanyType {
    ID : string, activeStatus : string, companyAddr : string, companyBisinessLicense : string, companyBizDivision : string,
    companyBizType : string, companyCeoMobile : string , companyCeoName : string, companyEmail : string, companyName : string,
    companyNotes : string, companyPhone : string, createDate : string
}
interface FileNameType {
    mainImage : string, jsonFile : string , binFile : string, xvlFile : string
}

export default function AssembleEditBox ({id, assembleid} : Props) {
    const router = useRouter()
    const [data ,setData] = useState<DataType>({
        mainImage : null , assembleName : '', assembleNotes : '',
        jsonFile : null, binFile : null, xvlFile : null,
        partners : []
    })
    const [preview , setPreview] = useState<string>('')
    const [fileName , setFileName] = useState<FileNameType>({
        mainImage : '', jsonFile : '', binFile : '', xvlFile : ''
    })
    const [partners , setPartners] = useState<PartnerCompanyType[]>([])

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
        console.log('Accepted files: ', acceptedFiles);
        const file = acceptedFiles[0];
        const reader = new FileReader()
        if(file) { reader.readAsDataURL(file) }
        reader.onload = () => {
            setData((prev) => ({...prev, mainImage : acceptedFiles[0]}))
            setPreview(reader.result as string)
            setFileName((prev) => ({...prev , mainImage : acceptedFiles[0].name as string}))
        }
    };

    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>, companyId: string) {
        const isChecked = e.target.checked
        setData((prev) => {
            const updatedCompanies = isChecked
                ? [...prev.partners, companyId] // 체크된 경우 ID 추가
                : prev.partners.filter((id) => id !== companyId) // 체크 해제된 경우 ID 제거
            return { ...prev, partners: updatedCompanies }
        })
    }

    async function getDetail() {
        const response = await api.get(`/admin/setup/getShipAssembleDetail.php?ID=${assembleid}`)
        if(response?.data?.result === true){
            if(response?.data?.List?.length > 0) {
                const result = response?.data?.List[0]
                setData((prev) => ({...prev, assembleName : result?.shipAssembleName, assembleNotes : result?.shipAssembleNotes, partners : result?.shipAssemblePartners ? result?.shipAssemblePartners?.split(',') : []}))
                setFileName((prev) => ({...prev , mainImage: result?.thumnailFilename, jsonFile : result?.jsonFilename,
                binFile : result?.binFilename, xvlFile : result?.xvlFilename}))
                setPreview(result?.thumnailFile)
            }
        }
    }

    async function getPartnerCompany () {
        const response = await api.get(`/admin/setup/getPartnerCompanyList.php?page=1&size=99&sortColumn=companyName&sortOrder=desc`)
        if(response?.data?.result === true){
            setPartners(response?.data?.List)
            if(assembleid !== 'regist') {getDetail()}
        }
    }

    async function save () {
        if(!fileName.mainImage) {alert('대조 대표 이미지를 업로드 해주세요.'); return;}
        if(!data?.assembleName) {alert('대조명을 입력해 주세요.'); return;}
        if(!data?.assembleNotes) {alert('대조 특이사항을 입력해 주세요.'); return;}
        const formData = new FormData()
        if(assembleid === 'regist') {formData.append('shipTypeId', id)}
        else {formData.append('ID', assembleid)}
        formData.append('shipAssembleNameKr', data?.assembleName)
        formData.append('shipAssemblePartners', data?.partners?.join(','))
        formData.append('shipAssembleNotes', data?.assembleNotes)
        if(data?.mainImage){
            formData.append('thumnailImage' , data?.mainImage)
        }
        if(data?.jsonFile){formData.append('assembleJsonFile', data?.jsonFile)}
        if(data?.binFile){formData.append('assembleBinFile', data?.binFile)}
        if(data?.xvlFile){formData.append('assembleXvlFile', data?.xvlFile)}
        if(assembleid === 'regist') {
            const response = await api.post(`/admin/setup/setShipAssemble.php`, formData)
            if(response?.data?.result === true) {
                alert(response?.data?.resultMsg); router.push(`/ship-manage/${id}`)
            }else{alert(response?.data?.resultMsg)}
        }else{
            const response = await api.post(`/admin/setup/updShipAssemble.php`, formData)
            if(response?.data?.result === true) {
                alert(response?.data?.resultMsg); router.push(`/ship-manage/${id}`)
            }else{alert(response?.data?.resultMsg)}
        }
    }

    useEffect(() => {
        getPartnerCompany()
    }, [])
    return(
        <>
        <div className="subsidary-manage-regist">
            <section>
                <div>
                    <h2>대조 대표 이미지 (<span>*</span>)</h2>
                    <Dropzone
                        onFileAccepted={handleFileAccepted}
                        fileType='image'
                    />
                    <p className="uploaded-img">
                        {preview && <Image src={preview} alt="대조" width={81} height={23}/>}
                        <span>{fileName?.mainImage}</span>
                    </p>
                </div>
                <div>
                    <h2>대조명 (<span>*</span>)</h2>
                    <input type="text" name="assembleName" value={data?.assembleName} onChange={handleChange} className="ship-name"/>
                </div>
                <div>
                    <h2>대조 특이사항 (<span>*</span>)</h2>
                    <textarea name="assembleNotes" value={data?.assembleNotes} onChange={handleChange}></textarea>
                </div>
            </section>
            <section>
                <div>
                    <h2>모델링 파일</h2>
                    <div>
                        <div>
                            <p>
                                <label>JSON</label><input type="file" name="jsonFile" onChange={handleChange}/>
                            </p>
                            <p>{fileName?.jsonFile}</p>
                        </div>
                        <div>
                            <p>
                                <label>BIN</label><input type="file" name="binFile" onChange={handleChange}/>
                            </p>
                            <p>{fileName?.binFile}</p>
                        </div>
                        <div>
                            <p>
                                <label>XVL</label><input type="file" name="xvlFile" onChange={handleChange}/>
                            </p>
                            <p>{fileName?.xvlFile}</p>
                        </div>
                    </div>
                </div>
                <div className="url-regist">
                    <h2>모델링 URL</h2>
                    <input type="text"/>
                </div>
                <div>
                    <h2>협력업체</h2>
                    <div>
                        {partners?.map((company: PartnerCompanyType, index: number) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleCheckboxChange(e, company?.ID?.toString())}
                                    checked={data?.partners?.includes(company?.ID?.toString())}
                                />
                                {company?.companyName}
                            </label>
                        ))}
                    </div>
                </div>
            </section>
        </div>
            <div className="btns2">
                <button onClick={save}>저장</button>
            </div>
        </>
    )
}
