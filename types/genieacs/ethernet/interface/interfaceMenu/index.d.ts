import { Base, Menu } from "@/types/genieacs/base";
import { Stats } from "./stats";

export interface InterfaceMenu extends Base {
  CurrentBitRate: Menu;
  Enable: Menu;
  LowerLayers: Menu;
  MACAddress: Menu;
  Stats: Stats;
  Status: Menu;
  X_MIKROTIK_Comment: Menu;
  X_MIKROTIK_LinkDowns: Menu;
  X_MIKROTIK_Name: Menu;
}
