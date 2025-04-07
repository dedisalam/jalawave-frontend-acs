import { AddressListPage } from "@/components/Device/mikrotik/address-list/Address-list.page";
import { AddressListProvider } from "@/components/Device/mikrotik/address-list/Address-list.context";

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
