import { Base, MenuString, MenuUnsignedInteger } from "../base";

export interface MemoryStatus extends Base {
  Free: MenuString | MenuUnsignedInteger;
  Total: MenuString | MenuUnsignedInteger;
}
