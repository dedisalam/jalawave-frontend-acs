import { Base, MenuUnsignedInteger } from "../base";
import { AccessPointMikrotik, AccessPointRuijie } from "./accessPoint";
import { NeighboringWiFiDiagnostic } from "./neighboringWiFiDiagnostic";
import { RadioMikrotik, RadioRuijie } from "./radio";
import { SSIDMikrotik, SSIDRuijie } from "./ssid";

export interface WiFiMikrotik extends Base {
  AccessPoint: AccessPointMikrotik;
  AccessPointNumberOfEntries: MenuUnsignedInteger;
  NeighboringWiFiDiagnostic: NeighboringWiFiDiagnostic;
  RadioNumberOfEntries: MenuUnsignedInteger;
  SSIDNumberOfEntries: MenuUnsignedInteger;
  SSID: SSIDMikrotik;
  Radio: RadioMikrotik;
}

export interface WiFiRuijie extends Base {
  AccessPoint: AccessPointRuijie;
  SSID: SSIDRuijie;
  Radio: RadioRuijie;
}
