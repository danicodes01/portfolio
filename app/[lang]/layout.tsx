import type { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import MainHeader from "@/components/main-header/main-header";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://www.danicodes.org";
const SITE_NAME = "Daniel Knowles";
const SITE_TITLE = "Daniel Knowles — Senior Software Engineer";
const SITE_DESCRIPTION =
  "Senior Software Engineer shipping AI systems, full-stack apps, and scalable backends end-to-end — from data modeling and APIs to LLM-powered agents.";

export const viewport = {
  themeColor: "#FF385C",
  colorScheme: "dark light",
};

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: `${SITE_URL}/en`,
        es: `${SITE_URL}/es`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: `${SITE_URL}/${lang}`,
      siteName: SITE_NAME,
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      creator: "@danicodes01",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/en/opengraph-image`,
  jobTitle: "Senior Software Engineer",
  description: SITE_DESCRIPTION,
  email: "mailto:danielgene.dev@gmail.com",
  sameAs: [
    "https://github.com/danicodes01",
    "https://www.linkedin.com/in/danicodes01/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ["en", "es"],
  author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />
        <MainHeader lang={lang} dict={dict} />
        {children}
      </body>
    </html>
  );
}