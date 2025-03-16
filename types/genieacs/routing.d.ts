import { Base, Menu } from "./base";

interface IPv4ForwardingMenu extends Base {
  DestIPAddress: Menu;
  DestSubnetMask: Menu;
  Enable: Menu;
  GatewayIPAddress: Menu;
  Interface: Menu;
  Origin: Menu;
  StaticRoute: Menu;
  Status: Menu;
}

interface IPv4Forwarding extends Base {
  "8": IPv4ForwardingMenu;
  "16": IPv4ForwardingMenu;
  "17": IPv4ForwardingMenu;
  "20": IPv4ForwardingMenu;
}

interface RouterMenu extends Base {
  Enable: Menu;
  IPv4Forwarding: IPv4Forwarding;
  IPv4ForwardingNumberOfEntries: Menu;
  Status: Menu;
}

interface Router extends Base {
  "1": RouterMenu;
}

export interface Routing extends Base {
  Router: Router;
  RouterNumberOfEntries: Menu;
}
