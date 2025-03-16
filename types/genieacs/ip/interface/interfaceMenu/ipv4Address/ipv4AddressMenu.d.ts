import { Base, MenuBoolean, MenuString } from "@/types/genieacs/base";

interface IPv4AddressMenuBase extends Base {
  AddressingType: MenuString;
  Enable: MenuBoolean;
  IPAddress: MenuString;
  SubnetMask: MenuString;
}

export interface IPv4AddressMenuMikrotik extends IPv4AddressMenuBase {
  Status: MenuString;
}

export type IPv4AddressMenuRuijie = IPv4AddressMenuBase;
