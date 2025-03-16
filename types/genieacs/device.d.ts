import { Base, MenuString, MenuUnsignedInteger } from "./base";
import { Cellular } from "./cellular";
import {
  DeviceInfoMikrotik,
  DeviceInfoRuijie,
  DeviceInfoYealink,
} from "./deviceInfo";
import { DHCPv4Mikrotik, DHCPv4Ruijie } from "./dhcpv4";
import { DNS } from "./dns";
import { Ethernet } from "./ethernet";
import { Firewall } from "./firewall";
import { Hosts } from "./hosts";
import { InterfaceStack } from "./interfaceStack";
import { IPMikrotik, IPRuijie } from "./ip";
import { LAN } from "./lan";
import {
  ManagementServerMikrotik,
  ManagementServerRuijie,
  ManagementServerYealink,
} from "./managementServer";
import { PPP } from "./ppp";
import { Routing } from "./routing";
import { WiFiMikrotik, WiFiRuijie } from "./wiFi";
import { X_MIKROTIK_Interface } from "./x_MIKROTIK_Interface";

export interface DeviceMikrotik extends Base {
  Cellular: Cellular;
  DeviceInfo: DeviceInfoMikrotik;
  DeviceSummary: MenuString;
  DHCPv4: DHCPv4Mikrotik;
  DNS: DNS;
  Ethernet: Ethernet;
  Firewall: Firewall;
  Hosts: Hosts;
  InterfaceStack: InterfaceStack;
  InterfaceStackNumberOfEntries: MenuUnsignedInteger;
  IP: IPMikrotik;
  ManagementServer: ManagementServerMikrotik;
  PPP: PPP;
  RootDataModelVersion: MenuString;
  Routing: Routing;
  WiFi: WiFiMikrotik;
  X_MIKROTIK_Interface: X_MIKROTIK_Interface;
}

export interface DeviceYealink extends Base {
  DeviceInfo: DeviceInfoYealink;
  DeviceSummary: MenuString;
  LAN: LAN;
  ManagementServer: ManagementServerYealink;
}

export interface DeviceRuijie extends Base {
  DeviceInfo: DeviceInfoRuijie;
  DHCPv4: DHCPv4Ruijie;
  IP: IPRuijie;
  WiFi: WiFiRuijie;
  ManagementServer: ManagementServerRuijie;
}
