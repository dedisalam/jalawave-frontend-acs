import { IPv4AddressMenuMikrotik } from "@/types/genieacs/ip/interface/interfaceMenu/ipv4Address/ipv4AddressMenu";

export interface Data extends IPv4AddressMenuMikrotik {
  Id: MenuString;
}

export interface Table extends Data {
  Enable: MenuString;
  CIDR: MenuString;
  Network: MenuString;
  Hardware: MenuString;
}
