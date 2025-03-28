import RebootPage from "@/components/pages/device/mikrotik/RebootPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  return <RebootPage params={params} />;
}
