import React from "react";
import Script from "next/script";
import '../globals.css'
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body>
          {children}
      </body>
      
    </html>
  );
}
