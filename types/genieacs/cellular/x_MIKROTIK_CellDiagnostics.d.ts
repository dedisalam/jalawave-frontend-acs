import { Base, Menu } from "../base";

export interface X_MIKROTIK_CellDiagnostics extends Base {
  DiagnosticsState: Menu;
  Interface: Menu;
  Result: Base;
  ResultNumberOfEntries: Menu;
  Seconds: Menu;
}
