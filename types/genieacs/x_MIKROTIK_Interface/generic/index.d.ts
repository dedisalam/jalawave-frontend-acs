import { Base } from "../../base";
import { GenericMenu } from "./genericMenu";

export interface Generic extends Base {
  [key: number]: GenericMenu;
}
