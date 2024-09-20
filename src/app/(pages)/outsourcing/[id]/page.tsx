import "@/app/assets/main.scss";
import "@/app/assets/outsourcing.scss";
import OutsourcingEdit from "@/components/Pages/Outsourcing/outsourcing-edit";
import React from "react";
interface ParamType {params : {id : string | undefined}}
export default function OutsourcingRegist({params : {id}} : ParamType) {
    return (
        <div className="outsourcing">
            <OutsourcingEdit
                id={id}
            />
        </div>
    )
}