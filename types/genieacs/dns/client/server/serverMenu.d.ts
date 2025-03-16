import { Base, MenuBoolean, MenuString } from "@/types/genieacs/base";

export interface ServerMenu extends Base {
  DNSServer: MenuString;
  Enable: MenuBoolean;
  Status: MenuString;
  Type: MenuString;
}
