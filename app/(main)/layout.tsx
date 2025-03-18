import Layout from "@/layout/layout";
import { Metadata, Viewport } from "next";
import { Suspense } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = { initialScale: 1, width: "device-width" };

export const metadata: Metadata = {
  title: "ACS Jalawave",
  description: "Frontend ACS Jalawave",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title: "Jalawave Cakrawala",
    url: "https://www.jalawave.net.id/",
    description: "Website Jalawave Cakrawala",
    ttl: 604800,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Suspense>
      <Layout>{children}</Layout>
    </Suspense>
  );
}
