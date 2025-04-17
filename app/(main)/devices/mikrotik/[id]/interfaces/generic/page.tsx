import { GenericProvider } from "@/components/Device/mikrotik/X_MIKROTIK_Interface/generic/Generic.context";
import { GenericPage } from "@/components/Device/mikrotik/X_MIKROTIK_Interface/generic/Generic.page";

export default function Page() {
  return (
    <GenericProvider>
      <GenericPage />
    </GenericProvider>
  );
}
