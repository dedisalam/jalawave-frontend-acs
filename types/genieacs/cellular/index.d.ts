import { Base, Menu } from "../base";
import { AccessPoint } from "./accessPoint";
import { X_MIKROTIK_CellDiagnostics } from "./x_MIKROTIK_CellDiagnostics";

export interface Cellular extends Base {
  AccessPoint: AccessPoint;
  AccessPointNumberOfEntries: Menu;
  Interface: Base;
  InterfaceNumberOfEntries: Menu;
  X_MIKROTIK_CellDiagnostics: X_MIKROTIK_CellDiagnostics;
}
