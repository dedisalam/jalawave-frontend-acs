import { Base } from "@/types/genieacs/base";
import { ServerMenu } from "./serverMenu";

export interface Server extends Base {
  [key: number]: ServerMenu;
}
