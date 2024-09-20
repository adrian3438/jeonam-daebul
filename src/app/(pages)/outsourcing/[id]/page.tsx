import "@/app/assets/main.scss";
import "@/app/assets/outsourcing.scss";
import OutsourcingEdit from "@/components/Pages/Outsourcing/outsourcing-edit";
import api from "@/lib/api";
import React from "react";
interface ParamType {params : {id : string | undefined}}
export default async function OutsourcingRegist({params : {id}} : ParamType) {
    let response = null;
    if(id !== 'regist'){
        response = await api.get(`/admin/user/getUserList.php?ID=${id}`)
    }
    console.log(response?.data)

    return (
        <div className="outsourcing">
            <OutsourcingEdit
                id={id}
            />
        </div>
    )
}