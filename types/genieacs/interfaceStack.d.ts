import { Base } from "./base";

interface InterfaceStackMenu extends Base {
  HigherLayer: Menu;
  LowerLayer: Menu;
}

export interface InterfaceStack extends Base {
  "1": InterfaceStackMenu;
  "2": InterfaceStackMenu;
  "3": InterfaceStackMenu;
  "4": InterfaceStackMenu;
  "5": InterfaceStackMenu;
  "6": InterfaceStackMenu;
  "7": InterfaceStackMenu;
}
