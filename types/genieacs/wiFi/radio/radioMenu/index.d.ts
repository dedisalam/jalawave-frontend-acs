import {
  Base,
  MenuBoolean,
  MenuString,
  MenuUnsignedInteger,
} from "@/types/genieacs/base";
import { X_MIKROTIK_Stats } from "./x_MIKROTIK_Stats";
import { Stats } from "./stats";

interface RadioMenuBase extends Base {
  AutoChannelEnable: MenuBoolean;
  AutoChannelSupported: MenuBoolean;
  Channel: MenuUnsignedInteger;
  Enable: MenuBoolean;
  OperatingFrequencyBand: MenuString;
  OperatingStandards: MenuString;
  Status: MenuString;
  SupportedFrequencyBands: MenuString;
}

export interface RadioMenuMikrotik extends RadioMenuBase {
  LowerLayers: MenuString;
  PossibleChannels: MenuString;
  Stats: Stats;
  SupportedStandards: MenuString;
  X_MIKROTIK_Stats: X_MIKROTIK_Stats;
}

export interface RadioMenuRuijie extends RadioMenuBase {
  ChannelsInUse: MenuString;
  Name: MenuString;
}
