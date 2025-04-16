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
import { EthernetLink } from "@/types/mikrotik";
import { Button } from "primereact/button";
import { LinkContext } from "./Link.context";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function LinkTable() {
  const { device } = useContext(MikrotikContext);
  const { setFormData, setDialog, setDialogHeader } = useContext(LinkContext);
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

  const editLink = (rowData: EthernetLink) => {
    setFormData(rowData);
    setDialog(true);
    setDialogHeader(`Link <${rowData.LowerLayers._value}>`);
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

  const idBodyTemplate = (rowData: EthernetLink) => {
    const arrOfId = rowData.Id._value.split(".");
    const id = arrOfId[arrOfId.length - 1];

    return `Link ${id}`;
  };

  const lowerLayersBodyTemplate = ({ LowerLayers }: EthernetLink) => {
    if (LowerLayers._value === "") {
      return LowerLayers._value;
    }

    if (LowerLayers._value.includes("Device.Ethernet.Interface")) {
      const ethernet = new Mikrotik(device).findByIdEthernetInterfaceV2(
        LowerLayers
      );
      if (!ethernet) {
        return "";
      }

      return ethernet.X_MIKROTIK_Name._value;
    }

    if (LowerLayers._value.includes("Device.WiFi.SSID")) {
      const ssid = new Mikrotik(device).findByIdWiFiSSIDV2(LowerLayers);
      if (!ssid) {
        return "";
      }

      return ssid.SSID._value;
    }

    return LowerLayers._value;
  };

  const actionBodyTemplate = (rowData: EthernetLink) => {
    if (rowData.LowerLayers._value === "") {
      return (
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          onClick={() => editLink(rowData)}
        />
      );
    }
  };

  return (
    <DataTable
      value={new Mikrotik(device).findAllEthernetLink()}
      filters={filters}
      globalFilterFields={["name"]}
      header={header}
    >
      <Column
        sortable
        field="Id._value"
        header="Link"
        body={idBodyTemplate}
      ></Column>
      <Column
        sortable
        field="LowerLayers._value"
        header="SSID / Ethernet"
        body={lowerLayersBodyTemplate}
      ></Column>
      <Column body={actionBodyTemplate}></Column>
    </DataTable>
  );
}
