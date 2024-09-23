import "@/app/assets/main.scss";
import "@/app/assets/outsourcing.scss";
import OutsourcingEdit from "@/components/Pages/Outsourcing/outsourcing-edit";
import api from "@/lib/api";
import React from "react";
interface ParamType {params : {id : string | Blob}}
export default async function OutsourcingRegist({params : {id}} : ParamType) {
    return (
        <div className="outsourcing">
            <OutsourcingEdit
                id={id}
            />
        </div>
    )
}