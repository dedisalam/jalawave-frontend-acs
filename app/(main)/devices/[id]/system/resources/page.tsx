import { ResourcesProvider } from "@/components/Device/mikrotik/resources/Resources.context";
import { ResourcesPage } from "@/components/Device/mikrotik/resources/Resources.page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  return (
    <ResourcesProvider params={params}>
      <ResourcesPage />
    </ResourcesProvider>
  );
}
