import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function StartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
