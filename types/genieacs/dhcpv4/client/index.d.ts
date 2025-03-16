import { Base } from "../../base";
import { ClientMenu } from "./clientMenu";

export interface Client extends Base {
  [key: number]: ClientMenu;
}
