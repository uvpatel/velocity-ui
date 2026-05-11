import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Velocity UI",
    template: "%s | Velocity UI",
  },
  description:
    "A production-ready SaaS UI registry and component marketplace for modern teams.",
  metadataBase: new URL("https://velocity-ui.com"),
  openGraph: {
    title: "Velocity UI",
    description:
      "Browse, publish, install, and manage UI components with a shadcn-style registry and SaaS dashboard.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velocity UI",
    description:
      "Browse, publish, install, and manage UI components with a shadcn-style registry and SaaS dashboard.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
