import {
  Base,
  MenuBoolean,
  MenuString,
  MenuUnsignedInteger,
} from "@/types/genieacs/base";
import { Stats } from "./stats";

export interface InterfaceMenu extends Base {
  CurrentBitRate: MenuUnsignedInteger;
  Enable: MenuBoolean;
  LowerLayers: MenuString;
  MACAddress: MenuString;
  Stats: Stats;
  Status: MenuString;
  X_MIKROTIK_Comment: MenuString;
  X_MIKROTIK_LinkDowns: MenuUnsignedInteger;
  X_MIKROTIK_Name: MenuString;
}
