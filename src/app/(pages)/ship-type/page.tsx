import "@/app/assets/main.scss";
import "@/app/assets/shipList.scss";
import { cookies } from "next/headers";
import api from "@/lib/api";
import ShipTypeBox from "@/components/Pages/ShipType/ship-type-box";
import ShipBopBox from "@/components/Pages/ShipType/ship-bop-box";
interface MainProps {
    searchParams: {
      s?: string | string[] | undefined;
    };
  }
export default async function Main({searchParams : {s}} : MainProps) {
    const cookie = cookies();
    const cookieValue : any = cookie.get('jdassid') || '';
    const response = await api.get(`/admin/getAdminMainDashBoard.php?shipAssembleName=`)
    const data = response?.data?.result === true ? response?.data?.List : []
    const shipid = s || response?.data?.List[0]?.ID?.toString() || '';
    return (
        <div className="ship-list">

            {/* 선종관리박스 */}
            <ShipTypeBox
                data={data}
                shipid={shipid}
            />
            
            {/* 대조관리박스 */}
            <ShipBopBox

            />
        </div>
    )
}