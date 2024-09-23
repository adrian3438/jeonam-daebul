import "@/app/assets/main.scss";
import "@/app/assets/ship-manage.scss";
import ShipAssembleListBox from "@/components/Pages/ShipManageMent/ship-assemble-list";
import api from "@/lib/api";
import React from "react";
interface ParamsType {
    params : {id : string | Blob}
}
export default async function ShipBopManage({params : {id}} : ParamsType) {
    // const response = await api.get(`/admin/setup/getShipAssembleList.php?shipTypeId=${id}`)
    // console.log(response?.data)
    return (
        <>
        <ShipAssembleListBox
            id={id}
            list={[]}
        />
        </>
    )
}