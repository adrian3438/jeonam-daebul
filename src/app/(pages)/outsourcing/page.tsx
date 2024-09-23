import "@/app/assets/main.scss";
import "@/app/assets/outsourcing.scss";
import React from "react";
import api from "@/lib/api";
import OutsourcingListBox from "@/components/Pages/Outsourcing/outsourcing-list";

interface searchParamsType {
    searchParams : {
        page : number,
        size : number,
        sortColumn : string,
        sortOrder : string
    }
}

export default async function OutsourcingList({searchParams : {
    page , size , sortColumn, sortOrder
}} : searchParamsType) {
    const response = await api.get(`/admin/setup/getPartnerCompanyList.php?page=${page || 1}&size=${size || 10}&sortColumn=${sortColumn || 'companyName'}&sortOrder=${sortOrder || 'desc'}`)
    const data = response?.data?.result === true ? response?.data?.List : [];
    const totalCount = response?.data?.result === true ? response?.data?.totalCnt : 0;
    // console.log(response?.data)
    return (
        <div className="outsourcing">
            <OutsourcingListBox
                data={data}
                totalCount={totalCount}
                page={page||1}
                size={size||10}
                sortColumn={sortColumn}
                sortOrder={sortOrder}
            />
        </div>
    )
}