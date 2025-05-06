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
import { Skeleton } from "primereact/skeleton";
import { UsersContext } from "./Users.context";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function UsersTable() {
  const { users } = useContext(UsersContext);

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

  if (!users) {
    return <Skeleton height="51rem"></Skeleton>;
  }

  return (
    <DataTable
      value={users}
      paginator
      showGridlines
      rows={10}
      dataKey="_id"
      filters={filters}
      globalFilterFields={["_id"]}
      header={header}
      emptyMessage="No users found."
      removableSort
      onFilter={(e) => setFilters(e.filters)}
    >
      <Column
        field="_id"
        header="Username"
        sortable
        style={{ minWidth: "12rem" }}
      />
      <Column
        field="roles"
        header="Roles"
        sortable
        style={{ minWidth: "12rem" }}
      />
    </DataTable>
  );
}
