import { Base, MenuString } from "../../base";

export interface AccessPointMenu extends Base {
  APN: MenuString;
  Password: MenuString;
  Username: MenuString;
}
