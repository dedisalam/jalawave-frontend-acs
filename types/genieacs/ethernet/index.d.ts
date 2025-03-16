import { Base, Menu } from "../base";
import { Interface } from "./interface";
import { Link } from "./link";

export interface Ethernet extends Base {
  Interface: Interface;
  InterfaceNumberOfEntries: Menu;
  Link: Link;
  LinkNumberOfEntries: Menu;
}
