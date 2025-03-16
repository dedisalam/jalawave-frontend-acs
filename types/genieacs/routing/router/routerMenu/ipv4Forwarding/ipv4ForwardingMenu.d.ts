import { Base, MenuBoolean, MenuString } from "@/types/genieacs/base";

export interface IPv4ForwardingMenu extends Base {
  DestIPAddress: MenuString;
  DestSubnetMask: MenuString;
  Enable: MenuBoolean;
  GatewayIPAddress: MenuString;
  Interface: MenuString;
  Origin: MenuString;
  StaticRoute: MenuBoolean;
  Status: MenuString;
}
