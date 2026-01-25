import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@shared/components/shared/header";
import { Providers } from "@shared/components/shared/providers";
import { Navigation } from "@/shared/components/shared/navigation";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Social Media",
};

export default function RootLayout({
  children,
  // modal,
}: Readonly<{
  children: React.ReactNode;
  // modal: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.className} bg-[#edeef0]`}>
        <Providers>
          <Header />
          <div className='max-w-6xl mx-auto flex gap-2'>
            <div className='w-48'>
              <Navigation />
            </div>

            <main className='flex-1 min-w-0'>{children}</main>
          </div>
          {/* {modal} */}
        </Providers>
      </body>
    </html>
  );
}
