import { DeviceProvider } from "@/components/Device/Device.context";
import { DevicePage } from "@/components/Device/Device.page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  return (
    <DeviceProvider params={params}>
      <DevicePage />
    </DeviceProvider>
  );
}
