import { Base, MenuBoolean, MenuUnsignedInteger } from "../../base";
import { PoolMikrotik, PoolRuijie } from "./pool";

export interface ServerMikrotik extends Base {
  Pool: PoolMikrotik;
  PoolNumberOfEntries: MenuUnsignedInteger;
}

export interface ServerRuijie extends Base {
  Pool: PoolRuijie;
  Enable: MenuBoolean;
}
