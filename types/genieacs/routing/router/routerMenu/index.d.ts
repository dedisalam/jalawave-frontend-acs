import {
  Base,
  MenuBoolean,
  MenuString,
  MenuUnsignedInteger,
} from "@/types/genieacs/base";
import { IPv4Forwarding } from "./ipv4Forwarding";

export interface RouterMenu extends Base {
  Enable: MenuBoolean;
  IPv4Forwarding: IPv4Forwarding;
  IPv4ForwardingNumberOfEntries: MenuUnsignedInteger;
  Status: MenuString;
}
