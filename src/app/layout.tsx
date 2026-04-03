import type { ReactNode } from "react";

import { AppProviders } from "@wew/components/providers/appProviders";
import { Footer } from "@wew/layout/footer";
import { Header } from "@wew/layout/header";

import { nunito, raleway } from "./fonts";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "weWork App",
  description: "Job posting and application platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className={`${nunito.className} min-h-full flex flex-col text-sm`}>
        <AppProviders>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
