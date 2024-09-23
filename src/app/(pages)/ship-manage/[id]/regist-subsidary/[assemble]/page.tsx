'use client';
import "@/app/assets/main.scss";
import "@/app/assets/ship-manage.scss";
import React from "react";
import AssembleEditBox from "@/components/Pages/ShipManageMent/assemble-edit";
interface ParamsType {
    params : {
        id : string | Blob
        assemble : string | Blob
    }
}
export default function SubsidaryRegist({params : {id , assemble}} : ParamsType) {
   

    return (
        <>
            <AssembleEditBox
                id={id}
                assembleid={assemble}
            />
        </>
    )
}