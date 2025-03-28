import type { Metadata } from "next";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "@/style/layout/layout.scss";
import "@/style/demo/Demos.scss";
import { PrimeReactProvider } from "primereact/api";
import { LayoutProvider } from "@/components/layout/context/layoutcontext";

export const metadata: Metadata = {
  title: "Jalawave ACS",
  description: "Jalawave frontend ACS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PrimeReactProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
