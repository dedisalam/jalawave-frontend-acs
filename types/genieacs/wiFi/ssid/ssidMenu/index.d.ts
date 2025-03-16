import { Base, MenuBoolean, MenuString } from "@/types/genieacs/base";
import { Stats } from "./stats";

interface SSIDMenuBase extends Base {
  Enable: MenuBoolean;
  LowerLayers: MenuString;
  SSID: MenuString;
  Status: MenuString;
}

export interface SSIDMenuMikrotik extends SSIDMenuBase {
  BSSID: MenuString;
  MACAddress: MenuString;
  Stats: Stats;
}

export interface SSIDMenuRuijie extends SSIDMenuBase {
  Name: MenuString;
  X_IPInterface: MenuString;
}
