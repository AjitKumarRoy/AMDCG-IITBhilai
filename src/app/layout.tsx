// src/app/layout.tsx
import "@/styles/globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InitialLoader from "@/components/InitialLoader";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: '--font-plus-jakarta-sans' });

export const metadata = {
  title: "IIT Bhilai Research Group",
  description: "Official website of the AMDCG group at IIT Bhilai.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body> {/* Make sure <body> starts immediately after <html> closing tag */}
        <InitialLoader />
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}