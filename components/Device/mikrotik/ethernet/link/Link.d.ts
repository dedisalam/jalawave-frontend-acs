import { MenuString } from "@/types/genieacs/base";
import { LinkMenu } from "@/types/genieacs/ethernet/link/linkMenu";

export interface Data extends LinkMenu {
  Id: MenuString;
}

export interface Table extends Data {
  Enable: MenuString;
  Hardware: MenuString;
}
