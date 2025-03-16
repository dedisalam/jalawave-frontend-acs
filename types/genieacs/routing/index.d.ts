import { Base, MenuUnsignedInteger } from "../base";
import { Router } from "./router";

export interface Routing extends Base {
  Router: Router;
  RouterNumberOfEntries: MenuUnsignedInteger;
}
