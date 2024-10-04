'use client'

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
const Editorjs = dynamic(() => import('./EditorJs'), {ssr : false})

export default function TestPage () {
    const [isClient, setClient] = useState<boolean>(false)
    useEffect(()=>{setClient(true)}, [])
    return(
        <>
        {isClient && <Editorjs/>}
        </>
    )
}