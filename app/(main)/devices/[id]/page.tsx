import DevicePage from "@/pages/DevicePage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  return <DevicePage params={params} />;
}
