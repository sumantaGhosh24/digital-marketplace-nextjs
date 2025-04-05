import "./globals.css";
import {Inter as FontSans} from "next/font/google";
import type {Metadata} from "next";
import {ReactNode} from "react";
import {Toaster} from "react-hot-toast";

import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/theme-provider";
import PrimaryColorProvider from "@/components/primary-provider";
import getServerUser from "@/actions/getServerUser";

import AuthProvider from "./_components/auth-provider";
import Header from "./_components/header";

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

export default async function RootLayout({children}: {children: ReactNode}) {
  const user = await getServerUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PrimaryColorProvider>
            <AuthProvider>
              <Header user={user ? JSON.parse(JSON.stringify(user)) : null} />
              <main>{children}</main>
              <Toaster />
            </AuthProvider>
          </PrimaryColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
