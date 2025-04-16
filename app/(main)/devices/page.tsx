import { DevicesProvider } from "@/components/Devices/Devices.context";
import { DevicesPage } from "@/components/Devices/Devices.page";

export default function Page() {
  return (
    <DevicesProvider>
      <DevicesPage />
    </DevicesProvider>
  );
}
