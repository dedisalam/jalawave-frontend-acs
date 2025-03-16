import { Base } from "../base";
import { InterfaceStackMenu } from "./interfaceStackMenu";

export interface InterfaceStack extends Base {
  [key: number]: InterfaceStackMenu;
}
