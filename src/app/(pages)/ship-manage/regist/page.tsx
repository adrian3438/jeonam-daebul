import "@/app/assets/main.scss";
import "@/app/assets/ship-manage.scss";
import ShipManageMentEditBox from "@/components/Pages/ShipManageMent/ship-mangement-edit";
import React from "react";
interface searchParamsType {
    searchParams : {id : string}
}
export default function SubsidaryRegist({searchParams : {id}} : searchParamsType) {
    return (
        <div>
            <ShipManageMentEditBox
                id={id}
            />
        </div>
    )
}