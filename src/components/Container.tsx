'use client'
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"
import Navigation from "./Navigation"
import Header from "./Header"
import { useAuth } from "./Context/AuthContext"

interface InfoType {
    result : boolean,
    list : [{
        ID : number , uuid : string , email : string , name : string
    }]
}
interface Props {children: ReactNode, info : InfoType}
export default function Container ({children , info} : Props) {
    console.log(info)
    const router = useRouter()
    const pathname = usePathname()
    const splitPath = pathname.split('/');
    const {login} = useAuth()
    useEffect(()=> {
        if(info?.result) {
            if(info?.list?.length > 0) {
                if(splitPath[1] === 'dotsAdmin'){
                    router.push(`/ship-type`)
                }
                login({isAdmin : true , data : info?.list[0]})
            }
        }else{
            if(splitPath[1] !== '' && splitPath[1] !== 'dotsAdmin'){
                alert('로그인이 필요합니다.');
                router.push('/dotsAdmin')
            }
        }
    }, [info])
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
                <Header info={info?.list?.length > 0 ? info?.list[0] : null}/>
                    {children}
                </main>
            </>
            }
        
        </>
    )
}