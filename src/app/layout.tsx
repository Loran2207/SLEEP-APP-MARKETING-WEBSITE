import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";

import { MotionProvider } from "@/components/MotionProvider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-instrument",
  display: "swap",
});

const title = "SLEEP - a calmer end to the day";
const description =
  "Your evening routine, sound mixer, breathing practice, sleep tracker and morning diary. One pure black app that never shouts at you.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sleep-app.vercel.app"),
  title: {
    default: title,
    template: "%s | SLEEP",
  },
  description,
  applicationName: "SLEEP",
  keywords: [
    "sleep tracker",
    "wind down routine",
    "sleep sounds",
    "4-7-8 breathing",
    "sleep diary",
    "digital wellbeing",
  ],
  openGraph: {
    type: "website",
    siteName: "SLEEP",
    title,
    description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} bg-void`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-void"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
