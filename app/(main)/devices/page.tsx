"use client";

import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";
import { Device } from "@/types/table";
import { DeviceService } from "@/service/DeviceService";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  serialNumber: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  manufacturer: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  arch: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  identity: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  ip: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  dhcpClientIp: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  productType: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  softwareVersion: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  uptime: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  lastUpdateInfo: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
};

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [loading, setLoading] = useState<boolean>(false);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  useEffect(() => {
    DeviceService.getData().then((data: Device[]) => {
      setDevices(data);
      setLoading(false);
    });
    initFilters();
  }, []);

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

    (_filters["global"] as DataTableFilterMetaData).value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters(defaultFilters);
    setGlobalFilterValue("");
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilter}
        />
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        value={devices}
        paginator
        showGridlines
        rows={10}
        loading={loading}
        dataKey="id"
        filters={filters}
        globalFilterFields={[
          "serialNumber",
          "manufacturer",
          "arch",
          "identity",
          "ip",
          "dhcpClientIp",
          "productType",
          "softwareVersion",
          "uptime",
          "lastUpdateInfo",
        ]}
        header={header}
        emptyMessage="No devices found."
        onFilter={(e) => setFilters(e.filters)}
      >
        <Column
          field="serialNumber"
          header="Serial Number"
          filter
          filterPlaceholder="Search by serial number"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="manufacturer"
          header="Manufacturer"
          filter
          filterPlaceholder="Search by manufacturer"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="arch"
          header="Architecture"
          filter
          filterPlaceholder="Search by architecture"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="identity"
          header="Identity"
          filter
          filterPlaceholder="Search by identity"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="ip"
          header="IP"
          filter
          filterPlaceholder="Search by ip"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="dhcpClientIp"
          header="DHCP Client IP"
          filter
          filterPlaceholder="Search by DHCP client ip"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="productType"
          header="Product Type"
          filter
          filterPlaceholder="Search by product type"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="softwareVersion"
          header="Software Version"
          filter
          filterPlaceholder="Search by software version"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="uptime"
          header="Uptime"
          filter
          filterPlaceholder="Search by uptime"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="lastUpdateInfo"
          header="Last Update Info"
          filter
          filterPlaceholder="Search by last update info"
          style={{ minWidth: "12rem" }}
        />
      </DataTable>
    </div>
  );
}
