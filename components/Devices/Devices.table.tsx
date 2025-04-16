"use client";

import React, { useState, useEffect, useContext } from "react";
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
import { Tag } from "primereact/tag";
import { Skeleton } from "primereact/skeleton";
import Link from "next/link";
import { DevicesContext } from "./Devices.context";
import { Device, Table } from "@/service/parser/Table";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function DevicesTable() {
  const { devices } = useContext(DevicesContext);

  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
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

  const serialNumberBodyTemplate = ({
    serialNumber,
    id,
    manufacturer,
  }: Device) => {
    let vendor = manufacturer.toLowerCase();
    if (manufacturer === "Ruijie Networks Co., Ltd") {
      vendor = "ruijie";
    }

    return (
      <Link href={`/devices/${vendor}/${encodeURIComponent(id)}`}>
        {serialNumber}
      </Link>
    );
  };

  const statusBodyTemplate = ({ status }: Device) => {
    return <Tag value={status} severity={getSeverity(status)} />;
  };

  const header = renderHeader();

  if (!devices) {
    return <Skeleton height="51rem"></Skeleton>;
  }

  return (
    <DataTable
      value={new Table(devices).getDevices()}
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
