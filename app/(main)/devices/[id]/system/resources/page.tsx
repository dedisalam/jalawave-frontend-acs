import ResourcesPage from "@/pages/device/mikrotik/ResourcesPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  return <ResourcesPage params={params} />;
}
