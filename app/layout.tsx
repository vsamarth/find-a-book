import type { Metadata } from "next";
import { Inter, Gloria_Hallelujah } from "next/font/google";
import "./globals.css";
import Link from "next/link";

// const inter = Inter({ subsets: ["latin"] });

const gloriaHallelujah = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Find A Book",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${gloriaHallelujah.className}`}>
        <main className="container mx-auto py-12 max-w-screen-md flex flex-col items-center gap-16">
         <Link href={'/'}> <h1 className="text-6xl">Find A Book</h1></Link>
          {children}
        </main>
      </body>
    </html>
  );
}
