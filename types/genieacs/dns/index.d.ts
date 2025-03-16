import { Base } from "../base";
import { Client } from "./client";

export interface DNS extends Base {
  Client: Client;
}
