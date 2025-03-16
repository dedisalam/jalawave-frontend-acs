import { Base } from "@/types/genieacs/base";
import {
  IPv4AddressMenuMikrotik,
  IPv4AddressMenuRuijie,
} from "./ipv4AddressMenu";

export interface IPv4AddressMikrotik extends Base {
  [key: number]: IPv4AddressMenuMikrotik;
}

export interface IPv4AddressRuijie extends Base {
  [key: number]: IPv4AddressMenuRuijie;
}
