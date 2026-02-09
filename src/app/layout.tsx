import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LightScreener",
  description: "Shine a light on every token",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
