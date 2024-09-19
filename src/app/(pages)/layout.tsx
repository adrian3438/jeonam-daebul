import '../globals.css'
import localFont from "next/font/local";
import Container from "../components/Container";
const pretendard = localFont({
    src: "../fonts/Pretendard-Regular.woff",
    variable: "--font-pretendard-sans",
});
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ko">
        <body className={`${pretendard.variable}`}>
            <Container>
                {children}
            </Container>
        </body>
        </html>
    );
}
