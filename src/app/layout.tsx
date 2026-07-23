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

// DESKTOP LOCK - temporary, remove the `width` line to restore the adaptive site.
// Pinning the virtual viewport to 1280 means phones and tablets scale the desktop
// layout down instead of crossing the sm/md/lg breakpoints, so the responsive
// layouts are hidden rather than deleted. Nothing else in the codebase changes.
// TO UNLOCK: delete the `width: DESKTOP_LOCK_WIDTH` line below, rebuild, deploy.
const DESKTOP_LOCK_WIDTH = 1280;

export const viewport: Viewport = {
  width: DESKTOP_LOCK_WIDTH,
  // no initialScale: with one, a phone would show the leftmost 1280px slice
  // instead of scaling the whole layout down to fit the screen
  initialScale: undefined,
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
