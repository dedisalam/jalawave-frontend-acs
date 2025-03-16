import { Base } from "../../base";
import { RouterMenu } from "./routerMenu";

export interface Router extends Base {
  [key: number]: RouterMenu;
}
