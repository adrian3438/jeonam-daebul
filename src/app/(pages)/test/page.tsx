import dynamic from 'next/dynamic'

const Editorjs = dynamic(() => import('@/components/EditorJs'), {ssr : false})
export default function Test () {

    return(
        <>
        <Editorjs/>
        </>
    )
}