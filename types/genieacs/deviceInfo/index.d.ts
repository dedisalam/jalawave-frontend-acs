import { Base, Menu } from "../base";
import { MemoryStatus } from "./memoryStatus";
import { ProcessStatus } from "./processStatus";
import { VendorConfigFile } from "./vendorConfigFile";

export interface DeviceInfo extends Base {
  Description: Menu;
  HardwareVersion: Menu;
  Manufacturer: Menu;
  ManufacturerOUI: Menu;
  MemoryStatus: MemoryStatus;
  ModelName: Menu;
  ProcessStatus: ProcessStatus;
  ProductClass: Menu;
  ProvisioningCode: Menu;
  SerialNumber: Menu;
  SoftwareVersion: Menu;
  UpTime: Menu;
  VendorConfigFile: VendorConfigFile;
  VendorConfigFileNumberOfEntries: Menu;
  X_MIKROTIK_ArchName: Menu;
  X_MIKROTIK_AutosupoutTime: Menu;
  X_MIKROTIK_BrandingPckgBuildTime: Menu;
  X_MIKROTIK_SystemIdentity: Menu;
}
