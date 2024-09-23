import "@/app/assets/main.scss";
import "@/app/assets/ship-manage.scss";
import React from "react";
import ShipManagementListBox from "@/components/Pages/ShipManageMent/ship-management-list";
import api from "@/lib/api";
interface searchParamsType {
    searchParams : {
        keyword : string
    }
}
export default async function ShipManage({searchParams : {keyword}} : searchParamsType) {
    // const response = await api.get(`/admin/setup/getShipTypeList.php?shipTypeName=${keyword || ''}`)
    // const data = response?.data?.result === true ? 
    // response?.data?.List : [];
    const data : any = []
    return (
        <div className="ship-manage">
            <ShipManagementListBox
                list={data}
                keyword={keyword}
            />
        </div>
    )
}