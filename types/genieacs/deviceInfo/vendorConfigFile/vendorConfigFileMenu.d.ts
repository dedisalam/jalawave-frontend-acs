import { Base, MenuBoolean, MenuString } from "../../base";

export interface VendorConfigFileMenu extends Base {
  Description: MenuString;
  Name: MenuString;
  UseForBackupRestore: MenuBoolean;
}
