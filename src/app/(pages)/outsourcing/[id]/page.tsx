import "@/app/assets/main.scss";
import "@/app/assets/outsourcing.scss";
import OutsourcingEdit from "@/components/Pages/Outsourcing/outsourcing-edit";
import api from "@/lib/api";
import React from "react";
interface ParamType {params : {id : string | Blob}}
export default async function OutsourcingRegist({params : {id}} : ParamType) {
    let response = null;
    let data = [];
    if(id !== 'regist'){
        response = await api.get(`/admin/user/getUserDetail.php?ID=${id}`)
        if(response?.data?.result === true) {
            if(response?.data?.List?.length > 0) {
                data = response?.data?.List[0];
            }
        }
    }
    console.log('response = id : ' + id)
    console.log(response?.data)

    return (
        <div className="outsourcing">
            <OutsourcingEdit
                id={id}
                list={data}
            />
        </div>
    )
}