import { MenuString } from "../genieacs/base";
import { IPv4AddressMenuMikrotik } from "../genieacs/ip/interface/interfaceMenu/ipv4Address/ipv4AddressMenu";

export interface AddressListMenu extends IPv4AddressMenuMikrotik {
  Network: MenuString;
  Interface: MenuString;
  InterfacePath: {
    code: string;
    name: string;
  };
  CIDR: MenuString;
}

export interface AddressListRow {
  key: string;
  value: AddressListMenu;
}
