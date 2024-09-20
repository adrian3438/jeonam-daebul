import Footer from "@/components/Footer";
import "@/app/assets/main.scss";
import "@/app/assets/shipList.scss";
import ModelingComponents from "@/components/Modeling/modeling";
import './modeling_ctrl.css'
export default function Main() {
    return (
        <>
            <div style={{width : '100%', height : '890px'}}>
                <ModelingComponents

                />
            </div>
            <Footer/>
        </>
    )
}