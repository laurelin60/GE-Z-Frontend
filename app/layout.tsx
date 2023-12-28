import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GE-Z",
    description:
        "GE-Z sources data from Assist.org and CVC.edu to find the perfect community college courses for you to take.",
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
                    <GoogleAnalytics />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
