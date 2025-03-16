import { Base, MenuUnsignedInteger } from "../base";
import { DiagnosticsMikrotik, DiagnosticsRuijie } from "./diagnostics";
import { InterfaceMikrotik, InterfaceRuijie } from "./interface";

export interface IPMikrotik extends Base {
  Diagnostics: DiagnosticsMikrotik;
  InterfaceNumberOfEntries: MenuUnsignedInteger;
  Interface: InterfaceMikrotik;
}

export interface IPRuijie extends Base {
  Diagnostics: DiagnosticsRuijie;
  Interface: InterfaceRuijie;
}
