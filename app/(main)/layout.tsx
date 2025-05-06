import Layout from "@/components/layout/layout";
import { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
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

export default async function AppLayout({ children }: AppLayoutProps) {
  const cookieStorage = await cookies();
  const cookie = cookieStorage.get("AUTH");
  if (!cookie) {
    return <meta httpEquiv="refresh" content="0; url=/auth/login" />;
  }

  return (
    <Suspense>
      <Layout>{children}</Layout>
    </Suspense>
  );
}
