import { Base } from "../../base";
import { RadioMenuMikrotik, RadioMenuRuijie } from "./radioMenu";

export interface RadioMikrotik extends Base {
  [key: number]: RadioMenuMikrotik;
}

export interface RadioRuijie extends Base {
  [key: number]: RadioMenuRuijie;
}
