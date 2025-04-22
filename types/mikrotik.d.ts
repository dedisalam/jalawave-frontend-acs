import { MenuString } from "./genieacs/base";
import { LinkMenu } from "./genieacs/ethernet/link/linkMenu";
import { InterfaceMenuMikrotik } from "./genieacs/ip/interface/interfaceMenu";
import { IPv4AddressMenuMikrotik } from "./genieacs/ip/interface/interfaceMenu/ipv4Address/ipv4AddressMenu";
import { RadioMenuMikrotik } from "./genieacs/wiFi/radio/radioMenu";
import { SSIDMenuMikrotik } from "./genieacs/wiFi/ssid/ssidMenu";

export interface HWInterface {
  Id: MenuString;
  Name: MenuString;
}

export interface EthernetLink extends LinkMenu {
  Id: MenuString;
}

export interface IPInterface extends InterfaceMenuMikrotik {
  Id: MenuString;
}

export interface TBIPInterface {
  Id: MenuString;
  HWInterface: HWInterface;
  Status: MenuString;
  Enable: MenuString;
  IPv4AddressNumberOfEntries: MenuUnsignedInteger;
}

export interface IPAddress extends IPv4AddressMenuMikrotik {
  Id: MenuString;
  CIDR: MenuString;
  Network: MenuString;
  HWInterface: HWInterface;
  IPInterface: MenuString;
}

export interface WiFiRadio extends RadioMenuMikrotik {
  Id: MenuString;
}

export interface WiFiSSID extends SSIDMenuMikrotik {
  Id: MenuString;
}
