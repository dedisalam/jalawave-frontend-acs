import { SSIDProvider } from "@/components/Device/mikrotik/wifi/ssid/ssid.context";
import { SSIDPage } from "@/components/Device/mikrotik/wifi/ssid/ssid.page";

export default function Page() {
  return (
    <SSIDProvider>
      <SSIDPage />
    </SSIDProvider>
  );
}
