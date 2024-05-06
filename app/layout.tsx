import type { Metadata } from "next";
import { Inter, Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/providers/toaster-provider";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={openSans.className}>
        <ToastProvider />
          <nav className="bg-cyan-900">
            <ul className="flex gap-x-4 p-8">
              <li><a href="/home">Home</a></li>
              <li><a href="/trainings">Trainings</a></li>
              <li><a href="/trainees">Trainees</a></li>
            </ul>
          </nav>
        <main className="p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
