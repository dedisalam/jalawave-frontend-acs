import { MikrotikProvider } from "@/components/Device/mikrotik/Mikrotik.context";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

export default function AppLayout({ params, children }: AppLayoutProps) {
  return <MikrotikProvider params={params}>{children}</MikrotikProvider>;
}
