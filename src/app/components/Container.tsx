'use client'
import api from "@/lib/api"
import Providers from "@/redux/providers"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
interface Props {info : any}
export default function Container ({children , info} : any) {
    console.log(info)
    const router = useRouter()

    useEffect(()=> {
        if(info?.result) {
           
        }else{
            router.push('/')
        }
    }, [info])
    return(
        <>
        <Providers>
            {children}
        </Providers>
        </>
    )
}