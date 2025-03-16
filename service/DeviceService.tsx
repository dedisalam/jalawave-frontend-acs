import axios from "axios";

export const DeviceService = {
  async getData() {
    const response = await axios.get("http://60.253.103.102:7557/devices");

    return response.data;
  },
};
