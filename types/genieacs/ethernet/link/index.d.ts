import { Base } from "../../base";
import { LinkMenu } from "./linkMenu";

export interface Link extends Base {
  [key: number]: LinkMenu;
}
