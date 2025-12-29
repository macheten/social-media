import type { Metadata } from "next";
import { Nunito, Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@shared/components/shared/Header";

// const nunito = Nunito({
//   variable: "--font-nunito",
//   subsets: ['latin', 'cyrillic']
// });

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ['latin', 'cyrillic']
});

export const metadata: Metadata = {
  title: "Social Media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${roboto.className}`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
