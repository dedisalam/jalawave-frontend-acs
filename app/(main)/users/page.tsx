import { UsersProvider } from "@/components/Users/Users.context";
import { UsersPage } from "@/components/Users/Users.page";

export default function Page() {
  return (
    <UsersProvider>
      <UsersPage />
    </UsersProvider>
  );
}
