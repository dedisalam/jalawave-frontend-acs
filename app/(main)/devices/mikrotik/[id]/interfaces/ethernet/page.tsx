import { InterfaceProvider } from "@/components/Device/mikrotik/interfaces/ethernet/Interface.context";
import { InterfacePage } from "@/components/Device/mikrotik/interfaces/ethernet/Interface.page";

export default function Page() {
  return (
    <InterfaceProvider>
      <InterfacePage />
    </InterfaceProvider>
  );
}
