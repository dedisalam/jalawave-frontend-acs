import { Base, Menu } from "../base";

export interface Server extends Base {
  Pool: Base;
  PoolNumberOfEntries: Menu;
}
