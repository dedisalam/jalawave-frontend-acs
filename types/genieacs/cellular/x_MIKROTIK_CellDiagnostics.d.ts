import { Base, MenuString, MenuUnsignedInteger } from "../base";

export interface X_MIKROTIK_CellDiagnostics extends Base {
  DiagnosticsState: MenuString;
  Interface: MenuString;
  Result: Base;
  ResultNumberOfEntries: MenuUnsignedInteger;
  Seconds: MenuUnsignedInteger;
}
