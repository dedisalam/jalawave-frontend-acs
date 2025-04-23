import { GenieService } from "../../../../../service/GenieService";
import { AxiosResponse } from "axios";
import { MenuString } from "@/types/genieacs/base";
import { Data } from "./Address";

export class AddressService {
  private genieService: GenieService;

  constructor() {
    this.genieService = new GenieService();
  }

  async refresh(id: string, IPInterface: MenuString): Promise<AxiosResponse> {
    return await this.genieService.refreshObject(
      id,
      `${IPInterface._value}.IPv4Address`
    );
  }

  async create(id: string, IPInterface: MenuString): Promise<AxiosResponse> {
    const response = await this.genieService.addObject(
      id,
      `${IPInterface._value}.IPv4Address`
    );

    await this.refresh(id, IPInterface);

    return response;
  }

  async update(
    id: string,
    IPInterface: MenuString,
    data: Data
  ): Promise<AxiosResponse> {
    const response = await this.genieService.setParameterValues(id, [
      [`${data.Id._value}.Enable`, data.Enable._value, data.Enable._type],
      [
        `${data.Id._value}.IPAddress`,
        data.IPAddress._value,
        data.IPAddress._type,
      ],
      [
        `${data.Id._value}.SubnetMask`,
        data.SubnetMask._value,
        data.SubnetMask._type,
      ],
    ]);

    await this.refresh(id, IPInterface);

    return response;
  }

  async remove(
    id: string,
    IPInterface: MenuString,
    data: Data
  ): Promise<AxiosResponse> {
    const response = await this.genieService.deleteObject(id, data.Id._value);

    await this.refresh(id, IPInterface);

    return response;
  }
}
