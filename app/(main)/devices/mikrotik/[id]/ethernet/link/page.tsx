import { LinkProvider } from "@/components/Device/mikrotik/ethernet/link/Link.context";
import { LinkPage } from "@/components/Device/mikrotik/ethernet/link/Link.page";

export default function Page() {
  return (
    <LinkProvider>
      <LinkPage />
    </LinkProvider>
  );
}
