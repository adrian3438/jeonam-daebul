import "@/app/assets/main.scss";
import "@/app/assets/setting.scss";
import SettingModal from '@/components/SettingModal'
import AdminList from "@/components/Pages/Setting/admin-list";

export default function ManagerList() {
    

    return (
        <div className="manager">
            <AdminList/>
        </div>
    )
}