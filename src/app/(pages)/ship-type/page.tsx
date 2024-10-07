import "@/app/assets/main.scss";
import "@/app/assets/shipList.scss";
import { cookies } from "next/headers";
import api from "@/lib/api";
import ShipTypeBox from "@/components/Pages/ShipType/ship-type-box";
import ShipAssembleBox from "@/components/Pages/ShipType/ship-assemble-box";
interface MainProps {
    searchParams: {
      s?: string | string[] | undefined;
      keyword : string
    };
  }
export default async function Main({searchParams : {s ,keyword}} : MainProps) {
    const cookie = cookies();
    const cookieValue : any = cookie.get('jdassid') || '';
    // 선종 리스트
    const response = await api.get(`/admin/getAdminMainDashBoard.php?shipAssembleName=`)
    const data = response?.data?.result === true ? response?.data?.List : []
    const initDataId=response?.data?.List[0]?.ID?.toString()
    // 선종 아이디
    const shipid = s || response?.data?.List[0]?.ID?.toString() || '';

    // 대조리스트
    const response2 = await api.get(`/admin/getShipAssembleListByShipType.php?shipTypeId=${s || response?.data?.List[0]?.ID?.toString()}&assembleName=${'123'}`)
    const data2 = response2?.data?.result === true ? response2?.data?.List : []
    console.log(response2?.data)
    return (
        <div className="ship-list">

            {/* 선종관리박스 */}
            <ShipTypeBox
                shipid={shipid}
            />

            {/* 대조관리박스 */}
            <ShipAssembleBox
                shipId={s}
                initId={initDataId}
                keyword={keyword}
            />
        </div>
    )
}
