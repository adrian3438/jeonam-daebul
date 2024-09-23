import "@/app/assets/main.scss";
import "@/app/assets/ship-manage.scss";
import BopEditBox from "@/components/Pages/ShipManageMent/bop-edit";
import React from "react";

interface ParamsType {
    params : {
        id : string | Blob;
        assembleid : string | Blob;
        bopid : string | Blob
    }
}
export default function BopRegist({params : {id , assembleid, bopid}} : ParamsType) {
    return (
        <>
        <BopEditBox
            id={id}
            assembleid={assembleid}
            bopid={bopid}
        />
        </>
    )
}