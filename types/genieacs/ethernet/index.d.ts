import { Base, MenuUnsignedInteger } from "../base";
import { Interface } from "./interface";
import { Link } from "./link";

export interface Ethernet extends Base {
  Interface: Interface;
  InterfaceNumberOfEntries: MenuUnsignedInteger;
  Link: Link;
  LinkNumberOfEntries: MenuUnsignedInteger;
}
