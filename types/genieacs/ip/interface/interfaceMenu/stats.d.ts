import { Base, MenuUnsignedInteger } from "@/types/genieacs/base";

export interface StatsRuijie extends Base {
  BytesReceived: MenuUnsignedInteger;
  BytesSent: MenuUnsignedInteger;
  DiscardPacketsReceived: MenuUnsignedInteger;
  DiscardPacketsSent: MenuUnsignedInteger;
  ErrorsReceived: MenuUnsignedInteger;
  ErrorsSent: MenuUnsignedInteger;
  PacketsReceived: MenuUnsignedInteger;
  PacketsSent: MenuUnsignedInteger;
}
