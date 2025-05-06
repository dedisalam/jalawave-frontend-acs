import React, { ReactNode } from "react";
import { FullPageToast } from "./FullPage.toast";

interface FullPageLayoutProps {
  children: ReactNode;
}

export default function FullPageLayout({ children }: FullPageLayoutProps) {
  return (
    <>
      {children}
      <FullPageToast />
    </>
  );
}
