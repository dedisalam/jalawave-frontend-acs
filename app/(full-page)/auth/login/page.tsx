import { AuthProvider } from "@/components/Auth/Auth.context";
import { AuthPage } from "@/components/Auth/Auth.page";

export default function Page() {
  return (
    <AuthProvider>
      <AuthPage />
    </AuthProvider>
  );
}
