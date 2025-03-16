import {
  Base,
  MenuBoolean,
  MenuDateTime,
  MenuString,
  MenuUnsignedInteger,
  MenuUnsignedIntegerString,
} from "../../base";

export interface DownloadDiagnostics extends Base {
  BOMTime: MenuDateTime;
  DSCP: MenuUnsignedInteger;
  DiagnosticsState: MenuString;
  DownloadDiagnosticMaxConnections: MenuUnsignedInteger;
  DownloadURL: MenuString;
  EOMTime: MenuDateTime;
  EnablePerConnectionResults: MenuBoolean;
  EthernetPriority: MenuUnsignedInteger;
  NumberOfConnections: MenuUnsignedInteger;
  PerConnectionResult: Base;
  PerConnectionResultNumberOfEntries: MenuUnsignedInteger;
  PeriodOfFullLoading: MenuUnsignedInteger;
  ROMTime: MenuDateTime;
  TCPOpenRequestTime: MenuDateTime;
  TCPOpenResponseTime: MenuDateTime;
  TestBytesReceived: MenuUnsignedInteger;
  TestBytesReceivedUnderFullLoading: MenuUnsignedInteger;
  TotalBytesReceived: MenuUnsignedInteger;
  TotalBytesReceivedUnderFullLoading: MenuUnsignedIntegerString;
  TotalBytesSent: MenuUnsignedIntegerString;
  TotalBytesSentUnderFullLoading: MenuUnsignedIntegerString;
}
