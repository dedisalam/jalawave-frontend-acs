export interface Representative {
  name: string;
  image: string;
}

export interface Country {
  name: string;
  code: string;
}

export interface Customer {
  id: number;
  name: string;
  country: Country;
  company: string;
  date: string;
  status: string;
  verified: boolean;
  activity: number;
  representative: Representative;
  balance: number;
}

export interface Device {
  id: string;
  serialNumber: string;
  manufacturer: string;
  arch: string;
  identity: string;
  ip: string;
  dhcpClientIp: string;
  productType: string;
  softwareVersion: string;
  uptime: number;
  lastUpdateInfo: string;
}
