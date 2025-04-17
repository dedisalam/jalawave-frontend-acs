import { WiFiRadio } from "@/types/mikrotik";
import { GenieService } from "./GenieService";
import { AxiosResponse } from "axios";

export class WiFiRadioService {
  private genieService: GenieService;
  constructor() {
    this.genieService = new GenieService();
  }

  async refresh(id: string): Promise<AxiosResponse> {
    return await this.genieService.refreshObject(id, "Device.WiFi.Radio");
  }

  async update(id: string, data: WiFiRadio): Promise<AxiosResponse> {
    const response = await this.genieService.setParameterValues(id, [
      [`${data.Id._value}.Enable`, data.Enable._value, data.Enable._type],
    ]);

    await this.refresh(id);

    return response;
  }
}
