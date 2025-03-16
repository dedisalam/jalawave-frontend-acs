import { Base, MenuString, MenuUnsignedInteger } from "../../base";

interface IPPingBase extends Base {
  AverageResponseTime: MenuUnsignedInteger;
  DataBlockSize: MenuUnsignedInteger;
  DiagnosticsState: MenuString;
  FailureCount: MenuUnsignedInteger;
  Host: MenuString;
  MaximumResponseTime: MenuUnsignedInteger;
  MinimumResponseTime: MenuUnsignedInteger;
  NumberOfRepetitions: MenuUnsignedInteger;
  SuccessCount: MenuUnsignedInteger;
  Timeout: MenuUnsignedInteger;
}

export interface IPPingMikrotik extends IPPingBase {
  AverageResponseTimeDetailed: MenuUnsignedInteger;
  DSCP: MenuUnsignedInteger;
  Interface: MenuString;
  MaximumResponseTimeDetailed: MenuUnsignedInteger;
  MinimumResponseTimeDetailed: MenuUnsignedInteger;
}

export type IPPingRuijie = IPPingBase;
