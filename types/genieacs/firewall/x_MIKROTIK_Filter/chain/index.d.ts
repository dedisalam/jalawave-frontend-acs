import { Base } from "@/types/genieacs/base";
import { ChainMenu } from "./chainMenu";

export interface Chain extends Base {
  [key: number]: ChainMenu;
}
