import "@/app/assets/main.scss";
import "@/app/assets/ship-manage.scss";
import BopEditBox from "@/components/Pages/ShipManageMent/bop-edit";
import React from "react";

interface ParamsType {
    params : {
        id : any;
        bopid : any;
    }
}
export default function BopRegist({params : {id , bopid}} : ParamsType) {
    return (
        <>
        <BopEditBox
            id={id}
            bopid={bopid}
        />
        </>
    )
}