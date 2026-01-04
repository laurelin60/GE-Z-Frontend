import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";

import Script from "next/script";
import { Footer } from "@/components/footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Header } from "@/components/header";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});

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
            <head>
                {process.env.NODE_ENV === "development" && (
                    <Script
                        src="//unpkg.com/react-grab/dist/index.global.js"
                        crossOrigin="anonymous"
                        strategy="beforeInteractive"
                    />
                )}
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} root overflow-hidden antialiased`}
            >
                <div className="flex min-h-dvh flex-col">
                    <Header />
                    <GoogleAnalytics />
                    <NuqsAdapter>
                        <div className="relative flex-1 md:h-0 md:flex-none md:grow md:justify-center">
                            <div className="flex max-h-full flex-wrap md:overflow-auto">
                                <div className="w-px grow">
                                    <div className="flex justify-center">
                                        <div className="w-px grow">
                                            {children}
                                        </div>
                                        <ScrollToTop />
                                    </div>
                                </div>
                                <Footer />
                            </div>
                        </div>
                    </NuqsAdapter>
                    <Toaster />
                </div>
            </body>
        </html>
    );
}
