import { WiFiSSID } from "@/types/mikrotik";
import { GenieService } from "./GenieService";

export class WiFiSSIDService {
  private genieService: GenieService;
  constructor() {
    this.genieService = new GenieService();
  }

  async update(id: string, data: WiFiSSID) {
    const response = await this.genieService.setParameterValues(id, [
      [`${data.Id._value}.SSID`, data.SSID._value, data.SSID._type],
      [
        `${data.Id._value}.LowerLayers`,
        data.LowerLayers._value,
        data.LowerLayers._type,
      ],
    ]);

    await this.genieService.refreshObject(id, "Device.WiFi.SSID");

    return response;
  }
}
