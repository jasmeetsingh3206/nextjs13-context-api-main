// "use-client"
import "../globals.css";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CounterContext } from "@/context/counter.context";
import React, { useContext } from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'ShopZee Cart',
    description: 'homepage by create next app',
}

export default function Cart({
    children,
}: {
    children: React.ReactNode
}) {
    // const { state, dispatch } = useContext(CounterContext);
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}