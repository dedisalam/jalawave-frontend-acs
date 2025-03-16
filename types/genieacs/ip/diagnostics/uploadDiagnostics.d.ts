import {
  Base,
  MenuBoolean,
  MenuDateTime,
  MenuString,
  MenuUnsignedInteger,
  MenuUnsignedIntegerString,
} from "../../base";

export interface UploadDiagnostics extends Base {
  BOMTime: MenuDateTime;
  DSCP: MenuUnsignedInteger;
  DiagnosticsState: MenuString;
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
  TestBytesSent: MenuUnsignedInteger;
  TestBytesSentUnderFullLoading: MenuUnsignedInteger;
  TestFileLength: MenuUnsignedInteger;
  TotalBytesReceived: MenuUnsignedIntegerString;
  TotalBytesReceivedUnderFullLoading: MenuUnsignedIntegerString;
  TotalBytesSent: MenuUnsignedInteger;
  TotalBytesSentUnderFullLoading: MenuUnsignedIntegerString;
  UploadDiagnosticsMaxConnections: MenuUnsignedInteger;
  UploadURL: MenuString;
}
