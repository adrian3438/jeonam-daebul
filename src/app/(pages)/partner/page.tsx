import "@/app/assets/main.scss";
import "@/app/assets/partner.scss";
import React from "react";
import api from "@/lib/api";
import PartnersListBox from "@/components/Pages/Partners/partners-list";

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
    const response = await api.get(`/admin/user/getUserList.php?page=${page || 1}&size=${size || 10}&sortColumn=${sortColumn || 'userName'}&sortOrder=${sortOrder || 'desc'}`)
    const data = response?.data?.result === true ? response?.data?.List : [];
    const totalCount = response?.data?.result === true ? response?.data?.totalCnt : 0;
    return (
        <div className="partner">
            <PartnersListBox
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