import { RadioProvider } from "@/components/Device/mikrotik/wifi/radio/Radio.context";
import { RadioPage } from "@/components/Device/mikrotik/wifi/radio/Radio.page";

export default function Page() {
  return (
    <RadioProvider>
      <RadioPage />
    </RadioProvider>
  );
}
