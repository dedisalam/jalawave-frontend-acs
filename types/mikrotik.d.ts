import { MenuString } from "./genieacs/base";
import { InterfaceMenu } from "./genieacs/ethernet/interface/interfaceMenu";
import { LinkMenu } from "./genieacs/ethernet/link/linkMenu";
import { InterfaceMenuMikrotik } from "./genieacs/ip/interface/interfaceMenu";
import { IPv4AddressMenuMikrotik } from "./genieacs/ip/interface/interfaceMenu/ipv4Address/ipv4AddressMenu";
import { RadioMenuMikrotik } from "./genieacs/wiFi/radio/radioMenu";
import { SSIDMenuMikrotik } from "./genieacs/wiFi/ssid/ssidMenu";
import { GenericMenu } from "./genieacs/x_MIKROTIK_Interface/generic/genericMenu";

export interface InterfaceGeneric extends GenericMenu {
  Id: MenuString;
}

export interface EthernetInterface extends InterfaceMenu {
  Id: MenuString;
}

export interface EthernetLink extends LinkMenu {
  Id: MenuString;
}

export interface IPInterface extends InterfaceMenuMikrotik {
  Id: MenuString;
}

export interface IPAddress extends IPv4AddressMenuMikrotik {
  Id: MenuString;
  CIDR: MenuString;
  Network: MenuString;
  HWInterface: {
    Id: MenuString;
    Name: MenuString;
  };
  IPInterface: MenuString;
}

export interface WiFiRadio extends RadioMenuMikrotik {
  Id: MenuString;
}

export interface WiFiSSID extends SSIDMenuMikrotik {
  Id: MenuString;
}
