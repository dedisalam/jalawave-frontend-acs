import { Base, MenuUnsignedInteger } from "../base";
import { Client } from "./client";
import { ServerMikrotik, ServerRuijie } from "./server";

export interface DHCPv4Mikrotik extends Base {
  Client: Client;
  ClientNumberOfEntries: MenuUnsignedInteger;
  Server: ServerMikrotik;
}

export interface DHCPv4Ruijie extends Base {
  Server: ServerRuijie;
}
