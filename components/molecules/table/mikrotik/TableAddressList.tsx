"use client";

import { AddressListContext } from "@/components/pages/device/mikrotik/context/AddressListContext";
import { Mikrotik } from "@/service/parser/Mikrotik";
import { AddressListRow } from "@/types/mikrotik/addresslist";
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
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import React, { useContext, useEffect, useState } from "react";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function TableAddressList() {
  const { device, setData, setDialog, setDialogHeader, loading } =
    useContext(AddressListContext);
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  useEffect(() => {
    initFilters();
  }, []);

  const editIP = (rowData: AddressListRow) => {
    setData(rowData);
    setDialog(true);
    setDialogHeader(`Address <${rowData.value.CIDR._value}>`);
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

  const flagBodyTemplate = ({ value }: AddressListRow) => {
    if (value.AddressingType._value === "X_MIKROTIK_Dynamic") {
      return <Tag value="D" severity="warning" />;
    }
  };

  const actionBodyTemplate = (rowData: AddressListRow) => {
    return (
      <Button
        icon="pi pi-pencil"
        rounded
        severity="success"
        onClick={() => editIP(rowData)}
      />
    );
  };

  if (loading || device === undefined) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  return (
    <DataTable
      value={new Mikrotik(device).getIPs()}
      filters={filters}
      globalFilterFields={["ip", "network", "interface"]}
      header={header}
    >
      <Column
        field="value.AddressingType._value"
        headerStyle={{ width: "3rem" }}
        body={flagBodyTemplate}
      ></Column>
      <Column sortable field="value.CIDR._value" header="Address"></Column>
      <Column sortable field="value.Network._value" header="Network"></Column>
      <Column
        sortable
        field="value.Interface._value"
        header="Interface"
      ></Column>
      <Column body={actionBodyTemplate}></Column>
    </DataTable>
  );
}
