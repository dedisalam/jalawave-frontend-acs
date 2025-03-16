import { Base, MenuUnsignedInteger } from "../../base";
import { Chain } from "./chain";

export interface X_MIKROTIK_NAT extends Base {
  Chain: Chain;
  ChainNumberOfEntries: MenuUnsignedInteger;
}
