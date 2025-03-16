import { Base } from "../../base";
import {
  AccessPointMenuMikrotik,
  AccessPointMenuRuijie,
} from "./accessPointMenu";

export interface AccessPointMikrotik extends Base {
  [key: number]: AccessPointMenuMikrotik;
}

export interface AccessPointRuijie extends Base {
  [key: number]: AccessPointMenuRuijie;
}
