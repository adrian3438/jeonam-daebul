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
            // router.push('/')
        }
    }, [info])
    return(
        <>
        <Providers>
            {splitPath[1] === '' ?
            <>
            {children}
            </>

            :

            <>
            <div className="snb">
                <Navigation/>
            </div>
            <main>
            <Header/>
                {children}
            </main>
            </>
            }
        </Providers>
        </>
    )
}