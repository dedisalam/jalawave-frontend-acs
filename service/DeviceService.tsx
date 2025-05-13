import { DeviceObject } from "@/types/genieacs";
// import {
//   EthernetLink,
//   IPAddress,
//   IPInterface,
//   WiFiSSID,
// } from "@/types/mikrotik";
import axios, { AxiosResponse } from "axios";
// import { Mikrotik } from "./parser/Mikrotik";
// import * as ipaddr from "ipaddr.js";
// import { MenuString } from "@/types/genieacs/base";

// interface FindIPAddressProps {
//   IPAddresses: IPAddress[];
//   newIP: IPAddress;
//   device: DeviceObjectMikrotik;
//   lowerLayers: MenuString;
// }

// interface UpdateToRadioProps {
//   device: DeviceObjectMikrotik;
//   newIP: IPAddress;
// }

export const DeviceService = {
  async findAll(): Promise<AxiosResponse<DeviceObject[]>> {
    const url = `${process.env.NEXT_PUBLIC_GENIEACS_URL}/devices`;

    const response = await axios.get<DeviceObject[]>(url);

    return response;
  },

  async findById(id: string): Promise<AxiosResponse<DeviceObject[]>> {
    const url = `${process.env.NEXT_PUBLIC_GENIEACS_URL}/devices/?query=%7B%22_id%22%3A%22${id}%22%7D`;

    const response = await axios.get<DeviceObject[]>(url);

    return response;
  },

  async reboot(id: string) {
    await axios.post(
      `${process.env.NEXT_PUBLIC_GENIEACS_URL}/devices/${id}/tasks?timeout=3000&connection_request=true`,
      {
        name: "reboot",
      }
    );
  },

  // async setParameterValues(
  //   id: string,
  //   parameterValues: (string | boolean)[][]
  // ): Promise<AxiosResponse> {
  //   const Id = encodeURIComponent(id);
  //   return await axios.post(
  //     `${process.env.NEXT_PUBLIC_GENIEACS_URL}/devices/${Id}/tasks?timeout=3000&connection_request=true`,
  //     {
  //       name: "setParameterValues",
  //       parameterValues,
  //     }
  //   );
  // },

  // async setIPInterfaceParameters(
  //   device: DeviceObjectMikrotik,
  //   parameterValues: (string | boolean)[][],
  //   lowerLayers: MenuString
  // ): Promise<IPInterface> {
  //   const response = await this.setParameterValues(device._id, parameterValues);
  //   if (response.status === 200) {
  //     await this.refreshObject(device._id, lowerLayers._value);
  //     const devices = await this.findById(encodeURIComponent(device._id));
  //     const device2 = devices.data[0] as DeviceObjectMikrotik;
  //     const mikrotik = new Mikrotik(device2);
  //     const IPInterface = mikrotik.findByLowerLayersIPInterface(lowerLayers);

  //     if (IPInterface) {
  //       return IPInterface;
  //     }

  //     return this.setIPInterfaceParameters(
  //       device2,
  //       parameterValues,
  //       lowerLayers
  //     );
  //   }
  //   return this.setIPInterfaceParameters(device, parameterValues, lowerLayers);
  // },

  // async addObject(id: string, objectName: string): Promise<AxiosResponse> {
  //   const Id = encodeURIComponent(id);
  //   const response = await axios.post(
  //     `${process.env.NEXT_PUBLIC_GENIEACS_URL}/devices/${Id}/tasks?timeout=3000&connection_request=true`,
  //     {
  //       name: "addObject",
  //       objectName,
  //     }
  //   );

  //   return response;
  // },

  // async deleteObject(id: string, objectName: string): Promise<AxiosResponse> {
  //   const Id = encodeURIComponent(id);
  //   const response = await axios.post(
  //     `${process.env.NEXT_PUBLIC_GENIEACS_URL}/devices/${Id}/tasks?timeout=3000&connection_request=true`,
  //     {
  //       name: "deleteObject",
  //       objectName,
  //     }
  //   );

  //   return response;
  // },

  // async getParamaterValues(id: string, parameterNames: string[]) {
  //   return await axios.post(
  //     `${process.env.NEXT_PUBLIC_GENIEACS_URL}/devices/${id}/tasks?timeout=3000&connection_request=true`,
  //     {
  //       name: "getParameterValues",
  //       parameterNames,
  //     }
  //   );
  // },

  // async refreshObject(id: string, objectName: string) {
  //   const Id = encodeURIComponent(id);
  //   const response = await axios.post(
  //     `${process.env.NEXT_PUBLIC_GENIEACS_URL}/devices/${Id}/tasks?timeout=3000&connection_request=true`,
  //     {
  //       name: "refreshObject",
  //       objectName,
  //     }
  //   );

  //   return response;
  // },

  // async createObject(
  //   objectName: string,
  //   oldDevice: DeviceObjectMikrotik,
  //   newIP: IPAddress
  // ) {
  //   await this.addObject(oldDevice._id, objectName);
  //   await this.refreshObject(oldDevice._id, objectName);
  //   const response = await this.findById(encodeURIComponent(oldDevice._id));

  //   const device = response.data[0] as DeviceObjectMikrotik;

  //   return await this.updateIpAddress(device, newIP);
  // },

  // async createObject2(
  //   objectName: string,
  //   oldDevice: DeviceObjectMikrotik
  // ): Promise<DeviceObjectMikrotik> {
  //   await this.addObject(oldDevice._id, objectName);
  //   await this.refreshObject(oldDevice._id, objectName);
  //   const response = await this.findById(encodeURIComponent(oldDevice._id));

  //   const device = response.data[0] as DeviceObjectMikrotik;

  //   return device;
  // },

  // async removeObject(
  //   objectName: string,
  //   oldDevice: DeviceObjectMikrotik,
  //   newIP: IPAddress
  // ): Promise<AxiosResponse | undefined> {
  //   await this.deleteObject(oldDevice._id, objectName);
  //   await this.refreshObject(oldDevice._id, objectName);
  //   const response = await this.findById(encodeURIComponent(oldDevice._id));

  //   const device = response.data[0] as DeviceObjectMikrotik;

  //   return await this.updateIpAddress(device, newIP);
  // },

  // isIpInRange(ip: string, range: string): boolean {
  //   try {
  //     const parsedIp = ipaddr.parse(ip);
  //     const [rangeIp, prefixLength] = ipaddr.IPv4.parseCIDR(range);
  //     return parsedIp.match(rangeIp, prefixLength);
  //   } catch (error) {
  //     console.error("Invalid IP or range:", error);
  //     return false;
  //   }
  // },

  // async findWiFiSSID(
  //   device: DeviceObjectMikrotik,
  //   lowerLayers: MenuString
  // ): Promise<WiFiSSID> {
  //   const mikrotik = new Mikrotik(device);
  //   const WiFiSSID = mikrotik.findByLowerLayersWiFiSSID(lowerLayers);
  //   if (WiFiSSID === undefined) {
  //     const device2 = await this.createObject2("Device.WiFi.SSID", device);
  //     const mikrotik2 = new Mikrotik(device2);
  //     const WiFiSSID2 = mikrotik2.findByLowerLayersWiFiSSID({
  //       _value: "",
  //       _object: false,
  //       _type: "xsd:string",
  //     });
  //     if (WiFiSSID2 === undefined) {
  //       return await this.findWiFiSSID(device2, lowerLayers);
  //     }
  //     return WiFiSSID2;
  //   }
  //   return WiFiSSID;
  // },

  // async findEthernetLink(
  //   device: DeviceObjectMikrotik,
  //   lowerLayers: MenuString
  // ): Promise<EthernetLink> {
  //   const mikrotik = new Mikrotik(device);
  //   const EthernetLink = mikrotik.findByLowerLayersEthernetLink(lowerLayers);
  //   if (EthernetLink === undefined) {
  //     const device2 = await this.createObject2("Device.Ethernet.Link", device);
  //     const mikrotik2 = new Mikrotik(device2);
  //     const EthernetLink2 = mikrotik2.findByLowerLayersEthernetLink({
  //       _value: "",
  //       _object: false,
  //       _type: "xsd:string",
  //     });
  //     if (EthernetLink2 === undefined) {
  //       return await this.findEthernetLink(device2, lowerLayers);
  //     }
  //     return EthernetLink2;
  //   }
  //   return EthernetLink;
  // },

  // async findIPInterface(
  //   device: DeviceObjectMikrotik,
  //   lowerLayers: MenuString
  // ): Promise<IPInterface> {
  //   const mikrotik = new Mikrotik(device);
  //   const IPInterface = mikrotik.findByLowerLayersIPInterface(lowerLayers);
  //   if (IPInterface === undefined) {
  //     const device2 = await this.createObject2("Device.IP.Interface", device);
  //     const mikrotik2 = new Mikrotik(device2);
  //     const IPInterface2 = mikrotik2.findByLowerLayersIPInterface({
  //       _value: "",
  //       _object: false,
  //       _type: "xsd:string",
  //     });
  //     if (IPInterface2 === undefined) {
  //       return await this.findIPInterface(device2, lowerLayers);
  //     }

  //     const parameters = [
  //       [`${IPInterface2.Id._value}.Enable`, true, IPInterface2.Enable._type],
  //       [
  //         `${IPInterface2.Id._value}.LowerLayers`,
  //         lowerLayers._value,
  //         IPInterface2.LowerLayers._type,
  //       ],
  //     ];

  //     const IPInterface3 = await this.setIPInterfaceParameters(
  //       device,
  //       parameters,
  //       IPInterface2.Id
  //     );

  //     return IPInterface3;
  //   }
  //   return IPInterface;
  // },

  // async findIPAddresses(
  //   device: DeviceObjectMikrotik,
  //   lowerLayers: MenuString
  // ): Promise<IPAddress[]> {
  //   const mikrotik = new Mikrotik(device);
  //   const IPAddresses = mikrotik.findByIPInterfaceIPAddress(lowerLayers);
  //   if (IPAddresses === undefined) {
  //     const mikrotik2 = await this.createObject2(
  //       `${lowerLayers._value}.IPv4Address`,
  //       device
  //     );
  //     return await this.findIPAddresses(mikrotik2, lowerLayers);
  //   }
  //   return IPAddresses;
  // },

  // async findIPAddress({
  //   device,
  //   IPAddresses,
  //   newIP,
  //   lowerLayers,
  // }: FindIPAddressProps): Promise<IPAddress> {
  //   const ip = ipaddr.IPv4.parseCIDR(newIP.CIDR._value);

  //   const IPAddress = IPAddresses.find((IPAddress) => {
  //     const emptyIP = IPAddress.IPAddress._value === "255.255.255.255";
  //     const emptySubnet = IPAddress.SubnetMask._value === "255.255.255.255";

  //     return (
  //       this.isIpInRange(ip[0].toNormalizedString(), IPAddress.CIDR._value) ||
  //       (emptyIP && emptySubnet)
  //     );
  //   });

  //   if (IPAddress === undefined) {
  //     const mikrotik2 = await this.createObject2(
  //       `${lowerLayers._value}.IPv4Address`,
  //       device
  //     );
  //     const IPAddresses2 = await this.findIPAddresses(mikrotik2, lowerLayers);

  //     return await this.findIPAddress({
  //       device: mikrotik2,
  //       IPAddresses: IPAddresses2,
  //       lowerLayers,
  //       newIP,
  //     });
  //   }

  //   return IPAddress;
  // },

  // async radioParameters({
  //   device,
  //   newIP,
  // }: UpdateToRadioProps): Promise<(string | boolean)[][]> {
  //   const ip = ipaddr.IPv4.parseCIDR(newIP.CIDR._value);
  //   const subnet = ipaddr.IPv4.subnetMaskFromPrefixLength(ip[1]);

  //   const WiFiSSID = await this.findWiFiSSID(device, newIP.HWInterface.Id);
  //   const EthernetLink = await this.findEthernetLink(device, WiFiSSID.Id);
  //   const IPInterface = await this.findIPInterface(device, EthernetLink.Id);
  //   const IPAddresses = await this.findIPAddresses(device, IPInterface.Id);
  //   const IPAddress = await this.findIPAddress({
  //     device,
  //     IPAddresses,
  //     lowerLayers: IPInterface.Id,
  //     newIP,
  //   });

  //   return [
  //     [`${WiFiSSID.Id._value}.Enable`, true, WiFiSSID.Enable._type],
  //     [
  //       `${WiFiSSID.Id._value}.LowerLayers`,
  //       newIP.HWInterface.Id._value,
  //       WiFiSSID.LowerLayers._type,
  //     ],
  //     [`${EthernetLink.Id._value}.Enable`, true, EthernetLink.Enable._type],
  //     [
  //       `${EthernetLink.Id._value}.LowerLayers`,
  //       WiFiSSID.Id._value,
  //       EthernetLink.LowerLayers._type,
  //     ],
  //     [`${IPInterface.Id._value}.Enable`, true, IPInterface.Enable._type],
  //     [
  //       `${IPInterface.Id._value}.LowerLayers`,
  //       EthernetLink.Id._value,
  //       IPInterface.LowerLayers._type,
  //     ],
  //     [`${IPAddress.Id._value}.Enable`, true, IPAddress.Enable._type],
  //     [
  //       `${IPAddress.Id._value}.IPAddress`,
  //       ip[0].toNormalizedString(),
  //       IPAddress.IPAddress._type,
  //     ],
  //     [
  //       `${IPAddress.Id._value}.SubnetMask`,
  //       subnet.toNormalizedString(),
  //       IPAddress.SubnetMask._type,
  //     ],
  //   ];
  // },

  // async ethernetParameters({
  //   device,
  //   newIP,
  // }: UpdateToRadioProps): Promise<(string | boolean)[][]> {
  //   const ip = ipaddr.IPv4.parseCIDR(newIP.CIDR._value);
  //   const subnet = ipaddr.IPv4.subnetMaskFromPrefixLength(ip[1]);

  //   const EthernetLink = await this.findEthernetLink(
  //     device,
  //     newIP.HWInterface.Id
  //   );
  //   const IPInterface = await this.findIPInterface(device, EthernetLink.Id);
  //   const IPAddresses = await this.findIPAddresses(device, IPInterface.Id);
  //   const IPAddress = await this.findIPAddress({
  //     device,
  //     IPAddresses,
  //     lowerLayers: IPInterface.Id,
  //     newIP,
  //   });

  //   return [
  //     [`${EthernetLink.Id._value}.Enable`, true, EthernetLink.Enable._type],
  //     [
  //       `${EthernetLink.Id._value}.LowerLayers`,
  //       newIP.HWInterface.Id._value,
  //       EthernetLink.LowerLayers._type,
  //     ],
  //     [`${IPInterface.Id._value}.Enable`, true, IPInterface.Enable._type],
  //     [
  //       `${IPInterface.Id._value}.LowerLayers`,
  //       EthernetLink.Id._value,
  //       IPInterface.LowerLayers._type,
  //     ],
  //     [`${IPAddress.Id._value}.Enable`, true, IPAddress.Enable._type],
  //     [
  //       `${IPAddress.Id._value}.IPAddress`,
  //       ip[0].toNormalizedString(),
  //       IPAddress.IPAddress._type,
  //     ],
  //     [
  //       `${IPAddress.Id._value}.SubnetMask`,
  //       subnet.toNormalizedString(),
  //       IPAddress.SubnetMask._type,
  //     ],
  //   ];
  // },

  // async genericParameters({
  //   device,
  //   newIP,
  // }: UpdateToRadioProps): Promise<(string | boolean)[][]> {
  //   const ip = ipaddr.IPv4.parseCIDR(newIP.CIDR._value);
  //   const subnet = ipaddr.IPv4.subnetMaskFromPrefixLength(ip[1]);

  //   const IPInterface = await this.findIPInterface(
  //     device,
  //     newIP.HWInterface.Id
  //   );
  //   const IPAddresses = await this.findIPAddresses(device, IPInterface.Id);
  //   const IPAddress = await this.findIPAddress({
  //     device,
  //     IPAddresses,
  //     lowerLayers: IPInterface.Id,
  //     newIP,
  //   });

  //   // [`${IPInterface.Id._value}.Enable`, true, IPInterface.Enable._type],
  //   // [
  //   //   `${IPInterface.Id._value}.LowerLayers`,
  //   //   newIP.HWInterface.Id._value,
  //   //   IPInterface.LowerLayers._type,
  //   // ],
  //   return [
  //     [`${IPAddress.Id._value}.Enable`, true, IPAddress.Enable._type],
  //     [
  //       `${IPAddress.Id._value}.IPAddress`,
  //       ip[0].toNormalizedString(),
  //       IPAddress.IPAddress._type,
  //     ],
  //     [
  //       `${IPAddress.Id._value}.SubnetMask`,
  //       subnet.toNormalizedString(),
  //       IPAddress.SubnetMask._type,
  //     ],
  //   ];
  // },

  // async updateIpAddress(
  //   device: DeviceObjectMikrotik,
  //   newIP: IPAddress
  // ): Promise<AxiosResponse | undefined> {
  //   const mikrotik = new Mikrotik(device);
  //   const oldIP = mikrotik.findByIdIPAddress(newIP.Id);

  //   const isToRadio = newIP.HWInterface.Id._value.includes("Device.WiFi.Radio");
  //   const isToEthernet = newIP.HWInterface.Id._value.includes(
  //     "Device.Ethernet.Interface"
  //   );
  //   const isToGeneric = newIP.HWInterface.Id._value.includes(
  //     "Device.X_MIKROTIK_Interface.Generic"
  //   );

  //   const parameters: (string | boolean)[][] = [];

  //   if (oldIP) {
  //     return await this.removeObject(oldIP.Id._value, device, newIP);
  //   }

  //   if (isToRadio) {
  //     const radioParameters = await this.radioParameters({ device, newIP });
  //     parameters.push(...radioParameters);
  //   }

  //   if (isToEthernet) {
  //     const ethernetParameters = await this.ethernetParameters({
  //       device,
  //       newIP,
  //     });
  //     parameters.push(...ethernetParameters);
  //   }

  //   if (isToGeneric) {
  //     const genericParameters = await this.genericParameters({ device, newIP });
  //     parameters.push(...genericParameters);
  //   }

  //   if (parameters.length > 0) {
  //     const resultParam = await this.setParameterValues(device._id, parameters);
  //     return resultParam;
  //   }
  // },

  // async removeEmptyIPInterface(device: DeviceObjectMikrotik) {
  //   const mikrotik = new Mikrotik(device);
  //   const IPInterfaces = mikrotik.findAllIPInterface();

  //   await Promise.all(
  //     IPInterfaces.map(async (IPInterface) => {
  //       await this.deleteObject(device._id, IPInterface.Id._value);
  //     })
  //   );

  //   await this.refreshObject(device._id, "Device.IP.Interface");
  // },
};
