"use client";

import { Mikrotik } from "@/parsers/Mikrotik";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
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

interface RowData {
  interface?: string;
  ip: string;
  network: string;
  flag: string;
}

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function TableAddressList({ device }: { device: DeviceObjectMikrotik }) {
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

  const header = (
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

  const flagBodyTemplate = (rowData: RowData) => {
    if (rowData.flag === "X_MIKROTIK_Dynamic") {
      return <Tag value="D" severity="warning" />;
    }
  };

  const actionBodyTemplate = (rowData: RowData) => {
    if (rowData.flag === "Static") {
      return <Button icon="pi pi-pencil" rounded severity="success" />;
    }
  };

  return (
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
      <Column body={actionBodyTemplate}></Column>
    </DataTable>
  );
}
