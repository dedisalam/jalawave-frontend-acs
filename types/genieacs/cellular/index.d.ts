import { Base, MenuUnsignedInteger } from "../base";
import { AccessPoint } from "./accessPoint";
import { X_MIKROTIK_CellDiagnostics } from "./x_MIKROTIK_CellDiagnostics";

export interface Cellular extends Base {
  AccessPoint: AccessPoint;
  AccessPointNumberOfEntries: MenuUnsignedInteger;
  Interface: Base;
  InterfaceNumberOfEntries: MenuUnsignedInteger;
  X_MIKROTIK_CellDiagnostics: X_MIKROTIK_CellDiagnostics;
}
