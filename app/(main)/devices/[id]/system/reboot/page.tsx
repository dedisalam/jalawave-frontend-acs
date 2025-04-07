import { RebootProvider } from "@/components/Device/mikrotik/reboot/Reboot.context";
import { RebootPage } from "@/components/Device/mikrotik/reboot/Reboot.page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  return (
    <RebootProvider params={params}>
      <RebootPage />
    </RebootProvider>
  );
}
