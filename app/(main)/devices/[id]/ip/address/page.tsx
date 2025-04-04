import AddressListPage from "@/components/pages/device/mikrotik/AddressListPage";
import { AddressListProvider } from "@/components/pages/device/mikrotik/context/AddressListContext";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  return (
    <AddressListProvider params={params}>
      <AddressListPage />
    </AddressListProvider>
  );
}
