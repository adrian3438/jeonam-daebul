import '../globals.css'
import localFont from "next/font/local";
import api from '@/lib/api';
import Container from '@/components/Container';
import { cookies } from 'next/headers';
import AuthProvider, { useAuth } from '@/components/Context/AuthContext';
import '@/app/assets/common.scss';
import Head from 'next/head';
import Script from 'next/script';
const pretendard = localFont({
    src: "../fonts/Pretendard-Regular.woff",
    variable: "--font-pretendard-sans",
});
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const cookie = cookies();
    const cookieValue : any = cookie.get('jdassid') || '';
    // const parseCookie = cookieValue && JSON.parse(cookieValue.value);
    const formData = new FormData()
    formData.append('managerUuid', cookieValue.value) 
    const response = await api.post(`/admin/adminInfo.php`, formData)
    return (
        <html lang="ko">  
        {/* <head>
            <script src="https://cdn.jsdelivr.net/npm/editorjs-layout@latest"></script>
            <script src="https://cdn.jsdelivr.net/npm/@calumk/editorjs-columns@latest"></script>
            <script src="https://cdn.jsdelivr.net/npm/editorjs-text-color-plugin/dist/bundle.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/editorjs-style@latest"></script>
        </head> */}
        <body className={`${pretendard.variable}`}>
        {/* <Script src="https://cdn.jsdelivr.net/npm/editorjs-layout@latest" strategy="afterInteractive"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/@calumk/editorjs-columns@latest" strategy="afterInteractive"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/editorjs-text-color-plugin/dist/bundle.js" strategy="afterInteractive"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/editorjs-style@latest" strategy="afterInteractive"></Script> */}
        <AuthProvider>
            <Container info={response?.data}>
                {children}
            </Container>
        </AuthProvider>
        </body>
        </html>
    );
}
