import { InterfaceProvider } from "@/components/Device/mikrotik/ip/interface/Interface.context";
import { InterfacePage } from "@/components/Device/mikrotik/ip/interface/Interface.page";

export default function Page() {
  return (
    <InterfaceProvider>
      <InterfacePage />
    </InterfaceProvider>
  );
}
