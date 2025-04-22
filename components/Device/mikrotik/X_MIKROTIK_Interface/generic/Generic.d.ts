import { MenuString } from "@/types/genieacs/base";
import { GenericMenu } from "@/types/genieacs/x_MIKROTIK_Interface/generic/genericMenu";

export interface Data extends GenericMenu {
  Id: MenuString;
}

export interface Table extends Data {
  Enable: MenuString;
}
