import { Base } from "../../base";
import { AccessPointMenu } from "./accessPointMenu";

interface AccessPoint extends Base {
  [key: number]: AccessPointMenu;
}
