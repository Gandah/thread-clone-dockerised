import { ClerkProvider } from "@clerk/nextjs"
import { Lato } from "next/font/google"

import type { Metadata } from "next";
import "../globals.css"
import { dark } from "@clerk/themes";
;

export const metadata: Metadata = {
    title: 'Threads',
    description: 'A  Threads clone application'
}

const lato = Lato({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
  });


export default function RootLayout({
    children
} : Readonly<{
    children: React.ReactNode;
  }>){


    return (
    <ClerkProvider
    appearance={{
        baseTheme: dark,
        variables: { colorText: 'white'}

      }}
    >
        <html lang="en">
            <body className={`${lato.className}`}>
                <div className="w-full flex flex-col gap-4
                justify-center items-center min-h-screen">                     
                 {children}
                </div>        
            </body>
        </html>
    </ClerkProvider>
    )
}