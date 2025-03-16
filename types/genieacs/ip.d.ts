import { Base, Menu } from "./base";

interface DownloadDiagnostics extends Base {
  BOMTime: Menu;
  DSCP: Menu;
  DiagnosticsState: Menu;
  DownloadDiagnosticMaxConnections: Menu;
  DownloadURL: Menu;
  EOMTime: Menu;
  EnablePerConnectionResults: Menu;
  EthernetPriority: Menu;
  NumberOfConnections: Menu;
  PerConnectionResult: Base;
  PerConnectionResultNumberOfEntries: Menu;
  PeriodOfFullLoading: Menu;
  ROMTime: Menu;
  TCPOpenRequestTime: Menu;
  TCPOpenResponseTime: Menu;
  TestBytesReceived: Menu;
  TestBytesReceivedUnderFullLoading: Menu;
  TotalBytesReceived: Menu;
  TotalBytesReceivedUnderFullLoading: Menu;
  TotalBytesSent: Menu;
  TotalBytesSentUnderFullLoading: Menu;
}

interface IPPing extends Base {
  AverageResponseTime: Menu;
  AverageResponseTimeDetailed: Menu;
  DSCP: Menu;
  DataBlockSize: Menu;
  DiagnosticsState: Menu;
  FailureCount: Menu;
  Host: Menu;
  Interface: Menu;
  MaximumResponseTime: Menu;
  MaximumResponseTimeDetailed: Menu;
  MinimumResponseTime: Menu;
  MinimumResponseTimeDetailed: Menu;
  NumberOfRepetitions: Menu;
  SuccessCount: Menu;
  Timeout: Menu;
}

interface TraceRoute extends Base {
  DSCP: Menu;
  DataBlockSize: Menu;
  DiagnosticsState: Menu;
  Host: Menu;
  Interface: Menu;
  MaxHopCount: Menu;
  NumberOfTries: Menu;
  ResponseTime: Menu;
  RouteHops: Base;
  RouteHopsNumberOfEntries: Menu;
  Timeout: Menu;
}

interface UploadDiagnostics extends Base {
  BOMTime: Menu;
  DSCP: Menu;
  DiagnosticsState: Menu;
  EOMTime: Menu;
  EnablePerConnectionResults: Menu;
  EthernetPriority: Menu;
  NumberOfConnections: Menu;
  PerConnectionResult: Base;
  PerConnectionResultNumberOfEntries: Menu;
  PeriodOfFullLoading: Menu;
  ROMTime: Menu;
  TCPOpenRequestTime: Menu;
  TCPOpenResponseTime: Menu;
  TestBytesSent: Menu;
  TestBytesSentUnderFullLoading: Menu;
  TestFileLength: Menu;
  TotalBytesReceived: Menu;
  TotalBytesReceivedUnderFullLoading: Menu;
  TotalBytesSent: Menu;
  TotalBytesSentUnderFullLoading: Menu;
  UploadDiagnosticsMaxConnections: Menu;
  UploadURL: Menu;
}

interface Diagnostics extends Base {
  DownloadDiagnostics: DownloadDiagnostics;
  IPPing: IPPing;
  TraceRoute: TraceRoute;
  UploadDiagnostics: UploadDiagnostics;
}

interface IPv4AddressMenu extends Base {
  AddressingType: Menu;
  Enable: Menu;
  IPAddress: Menu;
  Status: Menu;
  SubnetMask: Menu;
}

interface IPv4Address5 extends Base {
  "5": IPv4AddressMenu;
}

interface IPv4Address6 extends Base {
  "6": IPv4AddressMenu;
}

interface InterfaceBase extends Base {
  Enable: Menu;
  IPv4Address: Base;
  IPv4AddressNumberOfEntries: Menu;
  LowerLayers: Menu;
  Status: Menu;
  Type: Menu;
}

interface InterfaceMenu extends Base {
  Enable: Menu;
  IPv4Address: IPv4Address5 | IPv4Address6;
  IPv4AddressNumberOfEntries: Menu;
  LowerLayers: Menu;
  Status: Menu;
  Type: Menu;
}

interface Interface extends Base {
  "1": InterfaceMenu;
  "2": InterfaceBase;
  "3": InterfaceMenu;
  "4": InterfaceBase;
}

export interface IP extends Base {
  Diagnostics: Diagnostics;
  Interface: Interface;
  InterfaceNumberOfEntries: Menu;
}
