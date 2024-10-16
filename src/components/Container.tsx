'use client'
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"
import Navigation from "./Navigation"
import Header from "./Header"
import { useAuth } from "./Context/AuthContext"
import api from "@/lib/api"


interface Props {children: ReactNode, cookie : any}
export default function Container ({children , cookie} : Props) {
    const router = useRouter()
    const pathname = usePathname()
    const splitPath = pathname.split('/');
    const {login} = useAuth()
    const cookieValue = cookie && JSON.parse(cookie.value).id;
    const cookieBranch = cookie && JSON.parse(cookie.value).branch;
    console.log(cookieValue)
    useEffect(() =>{
        async function getInfo () {
            const formData = new FormData()
            if(cookie && cookieBranch === 'user') {
                formData.append('userUuid' , cookieValue)
                const response = await api.post(`/user/userInfo.php`, formData)
            }else if(cookie && cookieBranch === 'admin') {
                formData.append('managerUuid' , cookieValue)
                const response = await api.post('/admin/adminInfo.php', formData)
            }
        }
        getInfo()
    }), [cookieBranch]
    return(
        <>
            {splitPath[1] === '' || splitPath[1] === 'dotsAdmin' ?

            <>
                {children}
            </>
            :

            <>
                <div className="snb">
                    <Navigation/>
                </div>
                <main>
                <Header 
                
                />
                    {children}
                </main>
            </>
            }
        
        </>
    )
}