"use client";

import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Device } from "@/types/table";
import { DeviceService } from "@/service/DeviceService";
import { Tag } from "primereact/tag";
import { Skeleton } from "primereact/skeleton";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export default function TableDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [loading, setLoading] = useState<boolean>(true);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const getSeverity = (status: string) => {
    switch (status) {
      case "Online":
        return "success";

      case "Disconnect":
        return "danger";

      case "Other":
        return "warning";
    }
  };

  useEffect(() => {
    DeviceService.getData().then((data: Device[]) => {
      setDevices(data);
      setLoading(false);
    });
    initFilters();
  }, []);

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
      <div className="flex justify-content-end">
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

  const statusBodyTemplate = (rowData: Device) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const serialNumberBodyTemplate = (rowData: Device) => {
    return (
      <a
        href={`/devices/${encodeURIComponent(rowData.id)}`}
        rel="noopener noreferrer"
      >
        {rowData.serialNumber}
      </a>
    );
  };

  const header = renderHeader();

  if (loading) {
    return <Skeleton height="51rem"></Skeleton>;
  }

  return (
    <DataTable
      value={devices}
      paginator
      showGridlines
      rows={10}
      dataKey="id"
      filters={filters}
      globalFilterFields={[
        "serialNumber",
        "manufacturer",
        "identity",
        "ip",
        "dhcpClientIp",
        "productType",
        "softwareVersion",
        "status",
        "lastUpdateInfo",
      ]}
      header={header}
      emptyMessage="No devices found."
      removableSort
      onFilter={(e) => setFilters(e.filters)}
    >
      <Column
        field="serialNumber"
        header="Serial Number"
        body={serialNumberBodyTemplate}
        sortable
        style={{ minWidth: "12rem" }}
      />
      <Column
        field="manufacturer"
        header="Manufacturer"
        sortable
        style={{ minWidth: "12rem" }}
      />
      <Column
        field="identity"
        header="Identity"
        sortable
        style={{ minWidth: "12rem" }}
      />
      <Column field="ip" header="IP" sortable style={{ minWidth: "12rem" }} />
      <Column
        field="dhcpClientIp"
        header="DHCP Client IP"
        sortable
        style={{ minWidth: "12rem" }}
      />
      <Column
        field="productType"
        header="Product Type"
        sortable
        style={{ minWidth: "12rem" }}
      />
      <Column
        field="softwareVersion"
        header="Software Version"
        sortable
        style={{ minWidth: "12rem" }}
      />
      <Column
        field="status"
        header="Status"
        sortable
        body={statusBodyTemplate}
        style={{ minWidth: "12rem" }}
      />
      <Column
        field="lastUpdateInfo"
        header="Last Update Info"
        sortable
        style={{ minWidth: "12rem" }}
      />
    </DataTable>
  );
}
