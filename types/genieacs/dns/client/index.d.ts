import { Base, MenuUnsignedInteger } from "../../base";
import { Server } from "./server";

export interface Client extends Base {
  Server: Server;
  ServerNumberOfEntries: MenuUnsignedInteger;
}
