import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CarbonX | HackS'US v5.0 Registration",
    description: "Register for CarbonX - India's First AI-Workflow Hackathon",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="fixed inset-0 -z-10 bg-glow-mesh opacity-50 pointer-events-none" />
                <main className="relative">{children}</main>
            </body>
        </html>
    );
}
