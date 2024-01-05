import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clean Relay",
  description: "Report issues in your neighborhood for someone to fix!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning={true}>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <body className={clsx(inter.className)}>{children}</body>
      </html>
    </>
  );
}
