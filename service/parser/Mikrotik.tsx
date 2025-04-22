import { DeviceObjectMikrotik } from "@/types/genieacs";
import { AppMenuItem } from "@/types/layout";

interface BasicRow {
  field: string;
  value: string | number | boolean;
}

type BasicTable = BasicRow[];

export class Mikrotik {
  private device: DeviceObjectMikrotik;

  constructor(device: DeviceObjectMikrotik) {
    this.device = device;
  }

  getMenuItem(): AppMenuItem {
    const deviceID = encodeURIComponent(this.device._id);

    const menu = {
      label: this.device.Device.DeviceInfo.X_MIKROTIK_SystemIdentity._value,
      icon: "pi pi-fw pi-cog",
      items: [
        {
          label: "Interfaces",
          icon: "pi pi-fw pi-list",
          items: [
            {
              label: "Ethernet",
              icon: "pi pi-fw pi-list",
              to: `/devices/mikrotik/${deviceID}/interfaces/ethernet`,
            },
            {
              label: "Radio",
              icon: "pi pi-fw pi-wifi",
              to: `/devices/mikrotik/${deviceID}/interfaces/radio`,
            },
            {
              label: "Generic",
              icon: "pi pi-fw pi-list",
              to: `/devices/mikrotik/${deviceID}/interfaces/generic`,
            },
          ],
        },
        {
          label: "WiFi",
          icon: "pi pi-fw pi-wifi",
          items: [
            {
              label: "SSID",
              icon: "pi pi-fw pi-list",
              to: `/devices/mikrotik/${deviceID}/wifi/ssid`,
            },
          ],
        },
        {
          label: "Ethernet",
          icon: "pi pi-fw pi-list",
          items: [
            {
              label: "Link",
              icon: "pi pi-fw pi-list",
              to: `/devices/mikrotik/${deviceID}/ethernet/link`,
            },
          ],
        },
        {
          label: "IP",
          icon: "pi pi-fw pi-desktop",
          items: [
            {
              label: "Interface",
              icon: "pi pi-fw pi-list",
              to: `/devices/mikrotik/${deviceID}/ip/interface`,
            },
            {
              label: "Address",
              icon: "pi pi-fw pi-globe",
              to: `/devices/mikrotik/${deviceID}/ip/address`,
            },
          ],
        },
        {
          label: "System",
          icon: "pi pi-fw pi-cog",
          items: [
            {
              label: "Reboot",
              icon: "pi pi-fw pi-refresh",
              to: `/devices/mikrotik/${deviceID}/system/reboot`,
            },
            {
              label: "Resources",
              icon: "pi pi-fw pi-database",
              to: `/devices/mikrotik/${deviceID}/system/resources`,
            },
          ],
        },
      ],
    };

    return menu;
  }

  getResources(): BasicTable {
    const resources = [] as BasicTable;
    resources.push({
      field: "Uptime",
      value: this.device.Device.DeviceInfo.UpTime._value,
    });
    resources.push({
      field: "Free Memory",
      value: Math.round(
        Number(this.device.Device.DeviceInfo.MemoryStatus.Free._value) / 1024
      ).toPrecision(4),
    });
    resources.push({
      field: "Total Memory",
      value: Math.round(
        Number(this.device.Device.DeviceInfo.MemoryStatus.Total._value) / 1024
      ).toPrecision(4),
    });

    return resources;
  }
}
