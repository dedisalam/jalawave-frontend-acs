import { InterfaceProvider } from "@/components/Device/mikrotik/ethernet/interface/Interface.context";
import { InterfacePage } from "@/components/Device/mikrotik/ethernet/interface/Interface.page";

export default function Page() {
  return (
    <InterfaceProvider>
      <InterfacePage />
    </InterfaceProvider>
  );
}
