import { DeviceObject } from "@/types/genieacs";
import axios, { AxiosResponse } from "axios";

export class GenieService {
  private host: string;
  constructor() {
    this.host = process.env.NEXT_PUBLIC_GENIEACS_URL || "";
  }

  async findAll(): Promise<AxiosResponse<DeviceObject[]>> {
    const url = `${this.host}/devices`;
    const response = await axios.get<DeviceObject[]>(url);

    return response;
  }

  async findById(id: string): Promise<AxiosResponse<DeviceObject[]>> {
    const Id = encodeURIComponent(id);
    const url = `${this.host}/devices/?query=%7B%22_id%22%3A%22${Id}%22%7D`;
    const response = await axios.get<DeviceObject[]>(url);

    return response;
  }

  async reboot(id: string): Promise<AxiosResponse> {
    const Id = encodeURIComponent(id);
    const url = `${this.host}/devices/${Id}/tasks?timeout=3000&connection_request=true`;
    const data = { name: "reboot" };
    const response = await axios.post(url, data);

    return response;
  }

  async setParameterValues(
    id: string,
    parameterValues: (string | boolean)[][]
  ): Promise<AxiosResponse> {
    const Id = encodeURIComponent(id);
    const url = `${this.host}/devices/${Id}/tasks?timeout=3000&connection_request=true`;
    const data = { name: "setParameterValues", parameterValues };
    const response = await axios.post(url, data);

    return response;
  }

  async addObject(id: string, objectName: string): Promise<AxiosResponse> {
    const Id = encodeURIComponent(id);
    const url = `${this.host}/devices/${Id}/tasks?timeout=3000&connection_request=true`;
    const data = { name: "addObject", objectName };
    const response = await axios.post(url, data);

    return response;
  }

  async deleteObject(id: string, objectName: string): Promise<AxiosResponse> {
    const Id = encodeURIComponent(id);
    const url = `${this.host}/devices/${Id}/tasks?timeout=3000&connection_request=true`;
    const data = { name: "deleteObject", objectName };
    const response = await axios.post(url, data);

    return response;
  }

  async getParamaterValues(
    id: string,
    parameterNames: string[]
  ): Promise<AxiosResponse> {
    const Id = encodeURIComponent(id);
    const url = `${this.host}/devices/${Id}/tasks?timeout=3000&connection_request=true`;
    const data = { name: "getParameterValues", parameterNames };
    const response = await axios.post(url, data);

    return response;
  }

  async refreshObject(id: string, objectName: string): Promise<AxiosResponse> {
    const Id = encodeURIComponent(id);
    const url = `${this.host}/devices/${Id}/tasks?timeout=3000&connection_request=true`;
    const data = { name: "refreshObject", objectName };
    const response = await axios.post(url, data);

    return response;
  }
}
