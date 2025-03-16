import { Base } from "../../base";
import { InterfaceMenuMikrotik, InterfaceMenuRuijie } from "./interfaceMenu";

export interface InterfaceMikrotik extends Base {
  [key: number]: InterfaceMenuMikrotik;
}

export interface InterfaceRuijie extends Base {
  [key: number]: InterfaceMenuRuijie;
}
