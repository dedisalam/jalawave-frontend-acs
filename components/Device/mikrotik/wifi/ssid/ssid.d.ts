import { MenuString } from "@/types/genieacs/base";
import { SSIDMenuMikrotik } from "@/types/genieacs/wiFi/ssid/ssidMenu";

export interface Data extends SSIDMenuMikrotik {
  Id: MenuString;
}

export interface Table extends Data {
  Enable: MenuString;
}
