import { Base } from "../../base";
import { SSIDMenuMikrotik, SSIDMenuRuijie } from "./ssidMenu";

export interface SSIDMikrotik extends Base {
  [key: number]: SSIDMenuMikrotik;
}

export interface SSIDRuijie extends Base {
  [key: number]: SSIDMenuRuijie;
}
