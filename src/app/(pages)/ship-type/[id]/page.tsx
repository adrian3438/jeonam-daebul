import Footer from "@/components/Footer";
import "@/app/assets/main.scss";
import "@/app/assets/shipList.scss";
import ModelingComponents from "@/components/Modeling/modeling";
import './modeling_ctrl.css'
interface ParamsType {
    params : {id : string}, // 대조 또는 BOP 아이디
    searchParams : {
        t : string | Blob // 대조냐 BOP 냐 구분 짓는 문자열
        m : string  // 모델링 이름
        name : string   // 대조 또는 BOP 명
        s : string // 선종 아이디
    }
}

export default function Main({
    params : {id} , searchParams : {t , m, name, s}
} : ParamsType) {
    // id : 대조 또는 bop 아이디
    // t : 대조 인지 bop 인지 구분
    // m : 모델링 파일 명칭
    return (
        <>
            <div style={{width:"100%", height:"calc(100% - 59px)"}}>
                <ModelingComponents
                    modelingUrl={m}
                    name={name}
                />
            </div>
            <Footer
                id={id}
                type={t}
                shipId={s}
                
            />
        </>
    )
}
