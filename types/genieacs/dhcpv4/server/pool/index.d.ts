import { Base } from "../../../base";
import { PoolMenuMikrotik, PoolMenuRuijie } from "./poolMenu";

export interface PoolMikrotik extends Base {
  [key: number]: PoolMenuMikrotik;
}

export interface PoolRuijie extends Base {
  [key: number]: PoolMenuRuijie;
}
