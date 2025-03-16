import { Base } from "../../base";
import { DownloadDiagnostics } from "./downloadDiagnostics";
import { IPPingMikrotik, IPPingRuijie } from "./ipPing";
import { TraceRoute } from "./traceRoute";
import { UploadDiagnostics } from "./uploadDiagnostics";

export interface DiagnosticsMikrotik extends Base {
  DownloadDiagnostics: DownloadDiagnostics;
  TraceRoute: TraceRoute;
  UploadDiagnostics: UploadDiagnostics;
  IPPing: IPPingMikrotik;
}

export interface DiagnosticsRuijie extends Base {
  IPPing: IPPingRuijie;
}
