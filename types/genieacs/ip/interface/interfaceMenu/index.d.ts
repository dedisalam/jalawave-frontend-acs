import {
  Base,
  MenuBoolean,
  MenuString,
  MenuUnsignedInteger,
} from "../../../base";
import { IPv4AddressMikrotik, IPv4AddressRuijie } from "./ipv4Address";
import { StatsRuijie } from "./stats";

interface InterfaceMenuBase extends Base {
  Enable: MenuBoolean;
  IPv4AddressNumberOfEntries: MenuUnsignedInteger;
  Type: MenuString;
}

export interface InterfaceMenuMikrotik extends InterfaceMenuBase {
  IPv4Address: IPv4AddressMikrotik;
  LowerLayers: MenuString;
  Status: MenuString;
}

export interface InterfaceMenuRuijie extends InterfaceMenuBase {
  IPv4Address: IPv4AddressRuijie;
  Name: MenuString;
  Stats: StatsRuijie;
}
