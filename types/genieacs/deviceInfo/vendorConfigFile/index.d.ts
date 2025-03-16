import { Base } from "../../base";
import { VendorConfigFileMenu } from "./vendorConfigFileMenu";

export interface VendorConfigFile extends Base {
  [key: number]: VendorConfigFileMenu;
}
