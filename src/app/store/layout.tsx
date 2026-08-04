import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  // The frames are 1290 wide. The site-wide desktop lock would scale them.
  width: 1290,
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "App Store screenshots",
  robots: { index: false, follow: false },
};

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}