import { Base, MenuDateTime, MenuString, MenuUnsignedInteger } from "../base";
import { MemoryStatus } from "./memoryStatus";
import { ProcessStatus } from "./processStatus";
import { VendorConfigFile } from "./vendorConfigFile";

interface DeviceInfoBase extends Base {
  HardwareVersion: MenuString;
  ManufacturerOUI: MenuString;
  ProductClass: MenuString;
  ProvisioningCode: MenuString;
  SerialNumber: MenuString;
  SoftwareVersion: MenuString;
  UpTime: MenuUnsignedInteger;
}

export interface DeviceInfoMikrotik extends DeviceInfoBase {
  Description: MenuString;
  Manufacturer: MenuString & { _value: "MikroTik" };
  MemoryStatus: MemoryStatus;
  ProcessStatus: ProcessStatus;
  VendorConfigFile: VendorConfigFile;
  VendorConfigFileNumberOfEntries: MenuUnsignedInteger;
  X_MIKROTIK_ArchName: MenuString;
  X_MIKROTIK_AutosupoutTime: MenuDateTime;
  X_MIKROTIK_BrandingPckgBuildTime: MenuDateTime;
  X_MIKROTIK_SystemIdentity: MenuString;
  ModelName: MenuString;
}

export interface DeviceInfoYealink extends DeviceInfoBase {
  Manufacturer: MenuString & { _value: "Yealink" };
  ModelName: MenuString;
}

export interface DeviceInfoRuijie extends DeviceInfoBase {
  Manufacturer: MenuString & { _value: "Ruijie Networks Co., Ltd" };
  SpecVersion: MenuString;
  DeviceLog: MenuString;
  MemoryStatus: MemoryStatus;
}
