import { GoogleAnalytics } from "@next/third-parties/google";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], fallback: ["sans-serif"] });

export const metadata: Metadata = {
    title: "GE-Z",
    description:
        "GE-Z sources data from Assist.org and CVC.edu to find the perfect community college courses for you to take.",
    metadataBase: new URL("https://ge-z.vercel.app"),
    openGraph: {
        title: "GE-Z",
        description:
            "Find online, async, and articulable courses from California Community Colleges.",
        url: "https://ge-z.vercel.app",
        images: [
            {
                url: "/open-graph.png",
                width: 1728,
                height: 868,
            },
        ],
        locale: "en_US",
        type: "website",
    },
    // manifest: "/manifest",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex flex-col place-content-center bg-background text-text">
                    <Header />
                    <GoogleAnalytics gaId="G-PMNW29ZB3Y" />
                    {children}
                    <Footer />
                    <Toaster />
                </div>
            </body>
        </html>
    );
}
