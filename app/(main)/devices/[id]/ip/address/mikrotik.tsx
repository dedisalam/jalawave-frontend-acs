"use client";

import { Mikrotik } from "@/parsers/Mikrotik";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { FilterMatchMode } from "primereact/api";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import React, { useEffect, useState } from "react";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function IpAddressMikrotik({
  device,
}: {
  device: DeviceObjectMikrotik;
}) {
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

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

  const header = renderHeader();

  const flagBodyTemplate = (rowData: {
    interface?: string;
    ip: string;
    network: string;
    flag: string;
  }) => {
    if (rowData.flag === "X_MIKROTIK_Dynamic") {
      return <Tag value="D" severity="warning" />;
    }
  };

  return (
    <Card title="Address List" className="mb-4">
      <DataTable
        value={new Mikrotik(device).getIPs()}
        tableStyle={{ minWidth: "50rem" }}
        filters={filters}
        globalFilterFields={["ip", "network", "interface"]}
        header={header}
      >
        <Column field="flag" body={flagBodyTemplate}></Column>
        <Column sortable field="ip" header="Address"></Column>
        <Column sortable field="network" header="Network"></Column>
        <Column sortable field="interface" header="Interface"></Column>
      </DataTable>
    </Card>
  );
}
