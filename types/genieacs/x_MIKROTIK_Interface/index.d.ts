import { Base, MenuUnsignedInteger } from "../base";
import { Generic } from "./generic";

export interface X_MIKROTIK_Interface extends Base {
  Generic: Generic;
  GenericNumberOfEntries: MenuUnsignedInteger;
}
