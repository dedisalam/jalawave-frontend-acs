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

interface TableGenericProps {
  device: DeviceObjectMikrotik;
}

export function TableGeneric({ device }: TableGenericProps) {
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
      value={new Mikrotik(device).getInterfaceGeneric()}
      filters={filters}
      globalFilterFields={["name"]}
      header={header}
    >
      <Column sortable field="key" header="Key"></Column>
      <Column sortable field="value.Name._value" header="Key"></Column>
      <Column
        sortable
        field="value.LowerLayers._value"
        header="Lower Layers"
      ></Column>
    </DataTable>
  );
}
