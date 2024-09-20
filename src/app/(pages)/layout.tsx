import '../globals.css'
import localFont from "next/font/local";
import api from '@/lib/api';
import Container from '@/components/Container';
import { cookies } from 'next/headers';
import AuthProvider, { useAuth } from '@/components/Context/AuthContext';
import '@/app/assets/common.scss';
const pretendard = localFont({
    src: "../fonts/Pretendard-Regular.woff",
    variable: "--font-pretendard-sans",
});
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const cookie = cookies();
    const cookieValue : any = cookie.get('jdassid') || '';
    const parseCookie = cookieValue && JSON.parse(cookieValue.value);
    const formData = new FormData()
    formData.append('managerUuid', parseCookie?.ssid)
    const response = await api.post(`/admin/adminInfo.php`, formData)
    return (
        <html lang="ko">
        <body className={`${pretendard.variable}`}>
        <AuthProvider>
            <Container info={response?.data}>
                {children}
            </Container>
        </AuthProvider>
        </body>
        </html>
    );
}
