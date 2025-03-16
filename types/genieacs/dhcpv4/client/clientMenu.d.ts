import { Base, Menu } from "../../base";

export interface ClientMenu extends Base {
  DHCPServer: Menu;
  DHCPStatus: Menu;
  DNSServers: Menu;
  Enable: Menu;
  IPAddress: Menu;
  IPRouters: Menu;
  Interface: Menu;
  Status: Menu;
  SubnetMask: Menu;
}
