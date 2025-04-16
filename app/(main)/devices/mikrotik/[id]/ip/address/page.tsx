import { AddressProvider } from "@/components/Device/mikrotik/ip/address/Address.context";
import { AddressPage } from "@/components/Device/mikrotik/ip/address/Address.page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  return (
    <AddressProvider params={params}>
      <AddressPage />
    </AddressProvider>
  );
}
