import { Base, Menu } from "@/types/genieacs/base";

export interface ServerMenu extends Base {
  DNSServer: Menu;
  Enable: Menu;
  Status: Menu;
  Type: Menu;
}
