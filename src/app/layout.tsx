import type { Metadata } from "next";
import { geistSans } from "@/lib/font";
import "@/style/index.css";

export const metadata: Metadata = {
  title: "MOOX - Recommedation Movies Website",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.className}>{children}</body>
    </html>
  );
}
