import { Base, MenuString } from "../../base";

export interface ClientMenu extends Base {
  DHCPServer: MenuString;
  DHCPStatus: MenuString;
  DNSServers: MenuString;
  Enable: MenuBoolean;
  IPAddress: MenuString;
  IPRouters: MenuString;
  Interface: MenuString;
  Status: MenuString;
  SubnetMask: MenuString;
}
