import Header from "@/app/components/Header";
import Navigation from "@/app/components/Navigation";
import '../globals.css'
// import "@/app/assets/main.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Container from "../components/Container";
const pretendard = localFont({
    src: "../fonts/Pretendard-Regular.woff",
    variable: "--font-pretendard-sans",
  });
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    
    return (
        <>
        <html lang="ko">
        <body className={`${pretendard.variable}`}>
            <Container>
                {children}
            </Container>
        </body>
        </html>
            
        </>
    );
}
