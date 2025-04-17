import type { Metadata } from "next";
import { getDictionary } from "./dictionaries"; 
import { Inter } from "next/font/google";
import "@/app/globals.css";
import MainHeader from "@/components/main-header/main-header";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: {
      default: "Daniel Knowles",
      template: `%s | Daniel Knowles`
    },
    description: "Software Engineer Portfolio"
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <MainHeader lang={lang} dict={dict} />
        {children}
      </body>
    </html>
  );
}