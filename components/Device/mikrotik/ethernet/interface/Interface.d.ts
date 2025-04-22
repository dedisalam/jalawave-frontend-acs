import { InterfaceMenu } from "@/types/genieacs/ethernet/interface/interfaceMenu";

export interface Data extends InterfaceMenu {
  Id: MenuString;
}

export interface Table extends Data {
  Enable: MenuString;
}
