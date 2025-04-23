"use client";

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
import React, { useContext, useEffect, useState } from "react";
import { Skeleton } from "primereact/skeleton";
import { MikrotikContext } from "../../Mikrotik.context";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { InterfaceContext } from "./Interface.context";
import { Table } from "./Interface";
import { InterfaceParser } from "./Interface.parser";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function InterfaceTable() {
  const { device } = useContext(MikrotikContext);
  const { setFormData, setDialog, setDialogHeader } =
    useContext(InterfaceContext);
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const initFilters = () => {
    setFilters(defaultFilters);
    setGlobalFilterValue("");
  };

  useEffect(() => {
    initFilters();
  }, []);

  if (!device) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const edit = (item: Table) => {
    const ethernetInterface = new InterfaceParser(device).findById(item.Id);
    if (ethernetInterface) {
      setFormData(ethernetInterface);
      setDialog(true);
      setDialogHeader("Ethernet Interface Details");
    }
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

    (_filters["global"] as DataTableFilterMetaData).value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
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

  const enableBodyTemplate = ({ Enable }: Table) => {
    switch (Enable._value) {
      case "Enabled":
        return <Tag value={Enable._value} severity="success" />;
        break;

      case "Disabled":
        return <Tag value={Enable._value} severity="danger" />;
        break;

      default:
        return <Tag value={Enable._value} severity="info" />;
        break;
    }
  };

  const statusBodyTemplate = ({ Status }: Table) => {
    switch (Status._value) {
      case "Up":
        return <Tag value={Status._value} severity="success" />;
        break;

      case "Down":
        return <Tag value={Status._value} severity="danger" />;
        break;

      default:
        return <Tag value={Status._value} severity="info" />;
        break;
    }
  };

  const actionBodyTemplate = (item: Table) => {
    return (
      <Button
        icon="pi pi-pencil"
        rounded
        severity="success"
        onClick={() => edit(item)}
      />
    );
  };

  return (
    <DataTable
      value={new InterfaceParser(device).getTables()}
      filters={filters}
      globalFilterFields={[
        "X_MIKROTIK_Name._value",
        "Enable._value",
        "MACAddress._value",
        "CurrentBitRate._value",
        "Status._value",
      ]}
      header={header}
    >
      <Column sortable field="X_MIKROTIK_Name._value" header="Name"></Column>
      <Column
        sortable
        field="X_MIKROTIK_Comment._value"
        header="Comment"
      ></Column>
      <Column
        sortable
        field="Enable._value"
        header="Enable"
        body={enableBodyTemplate}
      ></Column>
      <Column sortable field="MACAddress._value" header="MAC Address"></Column>
      <Column
        sortable
        field="CurrentBitRate._value"
        header="Current Bit Rate"
      ></Column>
      <Column
        sortable
        field="Status._value"
        body={statusBodyTemplate}
        header="Status"
      ></Column>
      <Column body={actionBodyTemplate}></Column>
    </DataTable>
  );
}
