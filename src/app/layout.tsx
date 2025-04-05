import "./globals.css";
import {Inter as FontSans} from "next/font/google";
import type {Metadata} from "next";
import {ReactNode} from "react";

import {cn} from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Digital Marketplace",
    default: "Digital Marketplace",
  },
  description: "Digital marketplace built with Next.js",
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
