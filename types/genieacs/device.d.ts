import { Base, Menu } from "./base";
import { Cellular } from "./cellular";
import { DeviceInfo } from "./deviceInfo";
import { DHCPv4 } from "./dhcpv4";
import { DNS } from "./dns";
import { Ethernet } from "./ethernet";
import { Firewall } from "./firewall";
import { Hosts } from "./hosts";
import { IP } from "./ip";
import { ManagementServer } from "./managementServer";
import { PPP } from "./ppp";
import { Routing } from "./routing";

export interface Device extends Base {
  Cellular: Cellular;
  DeviceInfo: DeviceInfo;
  DeviceSummary: Menu;
  DHCPv4: DHCPv4;
  DNS: DNS;
  Ethernet: Ethernet;
  Firewall: Firewall;
  Hosts: Hosts;
  InterfaceStack: InterfaceStack;
  InterfaceStackNumberOfEntries: Menu;
  IP: IP;
  ManagementServer: ManagementServer;
  PPP: PPP;
  RootDataModelVersion: Menu;
  Routing: Routing;
  WiFi: object;
  X_MIKROTIK_Interface: object;
}
