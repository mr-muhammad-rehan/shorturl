import type { Metadata } from "next"; 
import "./globals.css";
 

export const metadata: Metadata = {
  title: "Url Shortener",
  description: "Simple and free URL shortener",
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
