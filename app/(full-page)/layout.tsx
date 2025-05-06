import { FullPageProvider } from "@/components/FullPage/FullPage.context";
import FullPageLayout from "@/components/FullPage/FullPage.layout";
import { Metadata } from "next";
import React from "react";

interface SimpleLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "PrimeReact Sakai",
  description:
    "The ultimate collection of design-agnostic, flexible and accessible React UI Components.",
};

export default function SimpleLayout({ children }: SimpleLayoutProps) {
  return (
    <React.Fragment>
      <FullPageProvider>
        <FullPageLayout>{children}</FullPageLayout>
      </FullPageProvider>
    </React.Fragment>
  );
}
