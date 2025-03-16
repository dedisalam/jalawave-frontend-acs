import { Base } from "../../base";
import { InterfaceMenu } from "./interfaceMenu";

export interface Interface extends Base {
  [key: number]: InterfaceMenu;
}
