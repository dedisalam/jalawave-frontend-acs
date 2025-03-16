import { Base, MenuString, MenuUnsignedInteger } from "../base";

export interface NeighboringWiFiDiagnostic extends Base {
  DiagnosticsState: MenuString;
  Result: Base;
  ResultNumberOfEntries: MenuUnsignedInteger;
}
