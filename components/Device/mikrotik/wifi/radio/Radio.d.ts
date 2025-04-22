import { MenuString } from "@/types/genieacs/base";
import { RadioMenuMikrotik } from "@/types/genieacs/wiFi/radio/radioMenu";

export interface Data extends RadioMenuMikrotik {
  Id: MenuString;
}

export interface Table extends Data {
  Enable: MenuString;
}
