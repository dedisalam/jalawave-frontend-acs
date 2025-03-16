import { Base, MenuString, MenuUnsignedInteger } from "../../base";

export interface TraceRoute extends Base {
  DSCP: MenuUnsignedInteger;
  DataBlockSize: MenuUnsignedInteger;
  DiagnosticsState: MenuString;
  Host: MenuString;
  Interface: MenuString;
  MaxHopCount: MenuUnsignedInteger;
  NumberOfTries: MenuUnsignedInteger;
  ResponseTime: MenuUnsignedInteger;
  RouteHops: Base;
  RouteHopsNumberOfEntries: MenuUnsignedInteger;
  Timeout: MenuUnsignedInteger;
}
