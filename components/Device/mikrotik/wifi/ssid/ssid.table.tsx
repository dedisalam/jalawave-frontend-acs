"use client";

import { Mikrotik } from "@/service/parser/Mikrotik";
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
import { WiFiSSID } from "@/types/mikrotik";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { SSIDContext } from "./ssid.context";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function SSIDTable() {
  const { device } = useContext(MikrotikContext);
  const { setFormData, setDialog, setDialogHeader } = useContext(SSIDContext);
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

  const getSeverity = (status: string) => {
    switch (status) {
      case "Up":
        return "success";

      case "Down":
        return "danger";
    }
  };

  const editSSID = (rowData: WiFiSSID) => {
    setFormData(rowData);
    setDialog(true);
    setDialogHeader(`SSID <${rowData.SSID._value}>`);
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

  const idBodyTemplate = (rowData: WiFiSSID) => {
    const arrOfId = rowData.Id._value.split(".");
    const id = arrOfId[arrOfId.length - 1];

    return id;
  };

  const lowerLayersBodyTemplate = (rowData: WiFiSSID) => {
    const arrOfId = rowData.LowerLayers._value.split(".");
    const id = arrOfId[arrOfId.length - 1];

    return `wlan${id}`;
  };

  const statusBodyTemplate = ({ Status }: WiFiSSID) => {
    return <Tag value={Status._value} severity={getSeverity(Status._value)} />;
  };

  const actionBodyTemplate = (rowData: WiFiSSID) => {
    return (
      <Button
        icon="pi pi-pencil"
        rounded
        severity="success"
        onClick={() => editSSID(rowData)}
      />
    );
  };

  return (
    <DataTable
      value={new Mikrotik(device).findAllWiFiSSID()}
      filters={filters}
      globalFilterFields={["name"]}
      header={header}
    >
      <Column
        sortable
        field="Id._value"
        header="Id"
        body={idBodyTemplate}
      ></Column>
      <Column sortable field="SSID._value" header="SSID"></Column>
      <Column
        sortable
        field="LowerLayers._value"
        body={lowerLayersBodyTemplate}
        header="Interface"
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
