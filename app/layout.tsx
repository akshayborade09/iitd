import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import ScaleWrapper from "@/components/ScaleWrapper";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  interactiveWidget: 'resizes-content',
};

export const metadata: Metadata = {
  title: "IITD CEP",
  description: "IIT Delhi Continuing Education Programme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className={`${dmSans.variable} h-full lg:overflow-hidden`}>
        <ScaleWrapper>
          {children}
        </ScaleWrapper>
      </body>
    </html>
  );
}
