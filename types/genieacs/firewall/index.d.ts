import { Base } from "../base";
import { X_MIKROTIK_ConnTrack } from "./x_MIKROTIK_ConnTrack";
import { X_MIKROTIK_Filter } from "./x_MIKROTIK_Filter";
import { X_MIKROTIK_NAT } from "./x_MIKROTIK_NAT";

export interface Firewall extends Base {
  X_MIKROTIK_ConnTrack: X_MIKROTIK_ConnTrack;
  X_MIKROTIK_Filter: X_MIKROTIK_Filter;
  X_MIKROTIK_NAT: X_MIKROTIK_NAT;
}
