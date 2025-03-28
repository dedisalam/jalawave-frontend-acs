import AddressListPage from "@/pages/device/mikrotik/AddressListPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  return <AddressListPage params={params} />;
}
