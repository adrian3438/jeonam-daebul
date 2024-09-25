import Footer from "@/components/Footer";
import "@/app/assets/main.scss";
import "@/app/assets/shipList.scss";
import ModelingComponents from "@/components/Modeling/modeling";
import './modeling_ctrl.css'
interface ParamsType {
    params : {id : string | Blob},
    searchParams : {
        t : string | Blob
        m : string | Blob
    }
}

export default function Main({
    params : {id} , searchParams : {t , m}
} : ParamsType) {
    // id : 대조 또는 bop 아이디
    // t : 대조 인지 bop 인지 구분
    // m : 모델링 파일 명칭
    return (
        <>
            <div style={{width:"100%", height:"calc(100% - 59px)"}}>
                <ModelingComponents

                />
            </div>
            <Footer
                id={id}
                type={t}
            />
        </>
    )
}
