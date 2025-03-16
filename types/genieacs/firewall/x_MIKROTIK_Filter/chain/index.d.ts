import { Base } from "@/types/genieacs/base";
import { ChainMenu } from "./chainMenu";
import { ChainBase } from "./chainBase";

export interface Chain extends Base {
  "1": ChainMenu;
  "2": ChainBase;
  "3": ChainBase;
}
