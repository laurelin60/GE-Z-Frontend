import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Degree-EZ",
    description:
        "Degree-EZ sources data from Assist.org and CVC.edu to find the perfect community college courses for you to take.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <div className="bg-background text-text flex flex-col place-content-center">
                <Header />
                {children}
                <Footer />
            </div>
        </html>
    );
}
