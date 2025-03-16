import { Base } from "@/types/genieacs/base";
import { IPv4ForwardingMenu } from "./ipv4ForwardingMenu";

export interface IPv4Forwarding extends Base {
  [key: number]: IPv4ForwardingMenu;
}
