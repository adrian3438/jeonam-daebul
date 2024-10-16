import React from "react";
import '../globals.css'
import localFont from "next/font/local";
import Container from "@/components/Container";
import api from "@/lib/api";
import { cookies } from "next/headers";
import AuthProvider from "@/components/Context/AuthContext";

const pretendard = localFont({
    src: "../fonts/Pretendard-Regular.woff",
    variable: "--font-pretendard-sans",
});
export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies();
  const cookieValue : any = cookie.get('jdssid') || null;
  return (
    <html lang="en">
      
      <body className={`${pretendard.variable}`}>
      <AuthProvider>
        <Container 
          cookie={cookieValue}
        >
          {children}
        </Container>
      </AuthProvider>
      </body>
      
    </html>
  );
}
