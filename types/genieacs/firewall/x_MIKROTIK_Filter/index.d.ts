import { Base, MenuUnsignedInteger } from "../../base";
import { Chain } from "./chain";

export interface X_MIKROTIK_Filter extends Base {
  Chain: Chain;
  ChainNumberOfEntries: MenuUnsignedInteger;
}
