"use client";

import { Mikrotik } from "@/service/parser/Mikrotik";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

interface TableInterfacesProps {
  device: DeviceObjectMikrotik;
}

export function TableInterfaces({ device }: TableInterfacesProps) {
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

  return (
    <DataTable
      value={new Mikrotik(device).getInterfaces()}
      filters={filters}
      globalFilterFields={["name"]}
      header={header}
    >
      <Column sortable field="key" header="Key"></Column>
      <Column
        sortable
        field="value.X_MIKROTIK_Name._value"
        header="Name"
      ></Column>
      <Column
        sortable
        field="value.MACAddress._value"
        header="MAC Address"
      ></Column>
      <Column
        sortable
        field="value.CurrentBitRate._value"
        header="Current Bit Rate"
      ></Column>
    </DataTable>
  );
}
