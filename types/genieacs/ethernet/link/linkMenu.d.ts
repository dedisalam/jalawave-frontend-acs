import { Base, MenuBoolean, MenuString } from "../../base";

export interface LinkMenu extends Base {
  Enable: MenuBoolean;
  LowerLayers: MenuString;
  Status: MenuString;
}
