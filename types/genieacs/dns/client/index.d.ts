import { Base } from "../../base";
import { Server } from "./server";

export interface Client extends Base {
  Server: Server;
  ServerNumberOfEntries: Menu;
}
