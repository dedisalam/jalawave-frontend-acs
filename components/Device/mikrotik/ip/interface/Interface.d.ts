import { InterfaceMenuMikrotik } from "@/types/genieacs/ip/interface/interfaceMenu";

export interface Data extends InterfaceMenuMikrotik {
  Id: MenuString;
}

export interface Table extends Data {
  Enable: MenuString;
  Hardware: MenuString;
}
