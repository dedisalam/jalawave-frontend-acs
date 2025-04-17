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
import { IPInterface } from "@/types/mikrotik";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { InterfaceContext } from "./Interface.context";
import { IPInterfaceService } from "@/service/IPInterfaceService";
import { LayoutContext } from "@/components/layout/context/layoutcontext";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function InterfaceTable() {
  const { toast } = useContext(LayoutContext);
  const { device, setRefresh } = useContext(MikrotikContext);
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

  const getSeverity = (status: string) => {
    switch (status) {
      case "Up":
        return "success";

      case "Down":
        return "danger";
    }
  };

  const editInterface = (rowData: IPInterface) => {
    setFormData(rowData);
    setDialog(true);
    setDialogHeader(`Interface <${rowData.LowerLayers._value}>`);
  };

  const removeInterface = (rowData: IPInterface) => {
    new IPInterfaceService().remove(device._id, rowData).then(() => {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Success Remove IP Interface",
      });

      setRefresh(true);
    });
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

  const idBodyTemplate = (rowData: IPInterface) => {
    const arrOfId = rowData.Id._value.split(".");
    const id = arrOfId[arrOfId.length - 1];

    return id;
  };

  const lowerLayersBodyTemplate = ({ LowerLayers }: IPInterface) => {
    if (LowerLayers._value === "") {
      return LowerLayers._value;
    }

    if (LowerLayers._value.includes("Device.Ethernet.Link")) {
      const ids = LowerLayers._value.split(".");
      const id = ids[ids.length - 1];
      const name = ids[ids.length - 2];

      return `${name} ${id}`;
    }

    if (LowerLayers._value.includes("Device.X_MIKROTIK_Interface.Generic")) {
      const generic = new Mikrotik(device).findByIdInterfaceGenericV2(
        LowerLayers
      );
      if (!generic) {
        return "";
      }

      return generic.Name._value;
    }

    return LowerLayers._value;
  };

  const statusBodyTemplate = ({ Status }: IPInterface) => {
    return <Tag value={Status._value} severity={getSeverity(Status._value)} />;
  };

  const actionBodyTemplate = (rowData: IPInterface) => {
    const isEmpty = rowData.IPv4AddressNumberOfEntries._value === 0;

    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          onClick={() => editInterface(rowData)}
        />
        {isEmpty && (
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            onClick={() => removeInterface(rowData)}
            className="ml-4"
          />
        )}
      </>
    );
  };

  return (
    <DataTable
      value={new Mikrotik(device).findAllIPInterface()}
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
      <Column
        sortable
        field="LowerLayers._value"
        header="Link / Interface Generic"
        body={lowerLayersBodyTemplate}
      ></Column>
      <Column sortable field="Enable._value" header="Enable"></Column>
      <Column
        sortable
        field="IPv4AddressNumberOfEntries._value"
        header="Total IP"
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
