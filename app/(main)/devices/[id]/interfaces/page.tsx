import InterfacesPage from "@/components/pages/device/mikrotik/InterfacesPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  return <InterfacesPage params={params} />;
}
