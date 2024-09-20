'use client'
import api from "@/lib/api"
import Providers from "@/redux/providers"
import axios from "axios"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import Navigation from "./Navigation"
import Header from "./Header"
interface Props {info : any}
export default function Container ({children , info} : any) {
    console.log(info)
    const router = useRouter()
    const pathname = usePathname()
    const splitPath = pathname.split('/')
    useEffect(()=> {
        if(info?.result) {
           
        }else{
            // alert('로그인이 필요합니다.');
            router.push('/dotsAdmin')
        }
    }, [info])
    return(
        <>
            {splitPath[1] === '' || splitPath[1] === 'dotsAdmin' ?

            <>
            <Providers>
                {children}
            </Providers>
            </>
            :

            <>
            <Providers>
                <div className="snb">
                    <Navigation/>
                </div>
                <main>
                <Header/>
                    {children}
                </main>
            </Providers>
            </>
            }
        
        </>
    )
}