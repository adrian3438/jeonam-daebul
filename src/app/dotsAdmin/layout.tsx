import React from "react";
import '../globals.css'
import localFont from "next/font/local";
import Container from "@/components/Container";

const pretendard = localFont({
    src: "../fonts/Pretendard-Regular.woff",
    variable: "--font-pretendard-sans",
});
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={`${pretendard.variable}`}>
        <Container>
          {children}
        </Container>
      </body>
      
    </html>
  );
}
