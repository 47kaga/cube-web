import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const cubeMono = Geist_Mono({
  variable: "--font-cube-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CUBE",
  description: "CUBE — Act 1 prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cubeMono.variable} h-full`}>
      <body className="crt-root min-h-full font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
