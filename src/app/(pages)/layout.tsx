import '../globals.css'
import localFont from "next/font/local";
import api from '@/lib/api';
import Container from '@/components/Container';
const pretendard = localFont({
    src: "../fonts/Pretendard-Regular.woff",
    variable: "--font-pretendard-sans",
});
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const formData = new FormData()
    formData.append('managerUuid', '66e7e19f07cd1')
    const response = await api.post(`/admin/adminInfo.php`, formData)
    return (
        <html lang="ko">
        <body className={`${pretendard.variable}`}>
            <Container info={response?.data}>
                {children}
            </Container>
        </body>
        </html>
    );
}
