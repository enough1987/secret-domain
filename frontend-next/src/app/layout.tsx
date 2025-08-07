import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Menu from "@/components/menu/menu";
import "./globals.scss";
import AuthProvider from "@/components/authProvider/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next",
  description: "Next.js application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <>
            <Menu />
            {children}
          </>
        </AuthProvider>
      </body>
    </html>
  );
}
