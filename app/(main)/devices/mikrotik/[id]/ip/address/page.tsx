import { AddressProvider } from "@/components/Device/mikrotik/ip/address/Address.context";
import { AddressPage } from "@/components/Device/mikrotik/ip/address/Address.page";

export default function Page() {
  return (
    <AddressProvider>
      <AddressPage />
    </AddressProvider>
  );
}
