import "@/app/assets/main.scss";
import "@/app/assets/partner.scss";
import PartnersEditBox from "@/components/Pages/Partners/partners-edit";
import React from "react";
interface ParamType {params : {id : string | Blob}}
export default function PartnerRegist({params : {id}} : ParamType) {
    return (
        <div className="partner">
            <PartnersEditBox
                id={id}
            />
        </div>
    )
}