import { InterfacesProvider } from "@/components/Device/mikrotik/interfaces/Interfaces.context";
import { InterfacesPage } from "@/components/Device/mikrotik/interfaces/Interfaces.page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  return (
    <InterfacesProvider params={params}>
      <InterfacesPage />
    </InterfacesProvider>
  );
}
