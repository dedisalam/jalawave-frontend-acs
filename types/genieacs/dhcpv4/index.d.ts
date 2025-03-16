import { Base, Menu } from "../base";
import { Client } from "./client";
import { Server } from "./server";

export interface DHCPv4 extends Base {
  Client: Client;
  ClientNumberOfEntries: Menu;
  Server: Server;
}
