import { Base, MenuBoolean, MenuString } from "../../base";

export interface GenericMenu extends Base {
  Enable: MenuBoolean;
  LowerLayers: MenuString;
  Name: MenuString;
  Status: MenuString;
}
