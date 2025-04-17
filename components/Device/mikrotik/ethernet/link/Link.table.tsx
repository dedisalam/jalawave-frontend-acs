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
import { EthernetLinkService } from "@/service/EthernetLinkService";
import { LayoutContext } from "@/components/layout/context/layoutcontext";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function LinkTable() {
  const { toast } = useContext(LayoutContext);
  const { device, setRefresh } = useContext(MikrotikContext);
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

  const edit = (data: EthernetLink) => {
    setFormData(data);
    setDialog(true);
    setDialogHeader(`Link Details`);
  };

  const remove = async (data: EthernetLink) => {
    const response = await new EthernetLinkService().remove(device._id, data);
    if (response.status === 200) {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Success Remove IP Address",
      });

      setRefresh(true);
    } else {
      toast.current?.show({
        severity: "danger",
        summary: "Error",
        detail: `Error ${response.status} Code`,
      });
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

  const idBodyTemplate = (data: EthernetLink) => {
    const arrOfId = data.Id._value.split(".");
    const id = arrOfId[arrOfId.length - 1];

    return id;
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

  const actionBodyTemplate = (data: EthernetLink) => {
    const isEmptyLowerLayers = data.LowerLayers._value === "";
    const IPInterface = new Mikrotik(device).findByLowerLayersIPInterface(
      data.Id
    );
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          onClick={() => edit(data)}
        />
        {(isEmptyLowerLayers || !IPInterface) && (
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            onClick={() => remove(data)}
            className="ml-3"
          />
        )}
      </>
    );
  };

  console.log("Ethernet Link", new Mikrotik(device).findAllEthernetLink());

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
      <Column sortable field="Enable._value" header="Enable"></Column>
      <Column body={actionBodyTemplate}></Column>
    </DataTable>
  );
}
