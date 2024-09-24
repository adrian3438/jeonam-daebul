'use client'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
    page : number
    totalCount : number
    size : number
    setPage : Function
}
export default function PopupPaginate ({

    page, size, totalCount, setPage

} : Props) {
    const router = useRouter()
    const path = usePathname()
    const query = useSearchParams()
    function handleChange (e:React.ChangeEvent<unknown>, pageNumber : number){
        setPage(pageNumber)
    }
    
    return(
        <>
        <Stack spacing={2}>
            <Pagination page={page} count={Math.ceil(totalCount/size)} shape="rounded" onChange={handleChange} boundaryCount={1} showFirstButton showLastButton/>
        </Stack>
        </>
    )
}