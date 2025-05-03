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
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { InterfaceService } from "./Interface.service";
import { Table } from "./Interface";
import { InterfaceParser } from "./Interface.parser";
import { RemoveButton } from "./Interface.remove-button";
import { LinkParser } from "../../ethernet/link/Link.parser";

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
  const [removeLoading, setRemoveLoading] = useState(false);

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

  const editInterface = ({ Id }: Table) => {
    const Interface = new InterfaceParser(device).findById(Id);
    if (Interface) {
      setFormData(Interface);
      setDialog(true);
      setDialogHeader("IP Interface Details");
    }
  };

  const removeInterface = async ({ Id }: Table) => {
    setRemoveLoading(true);
    const Interface = new InterfaceParser(device).findById(Id);
    if (Interface) {
      const response = await new InterfaceService().remove(
        device._id,
        Interface
      );
      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Success Remove IP Interface",
        });

        setRefresh(true);
      } else {
        toast.current?.show({
          severity: "danger",
          summary: "Error",
          detail: `Error ${response.status} Code`,
        });
      }
    }
    setRemoveLoading(false);
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
        return <Tag value={Enable._value} />;
        break;
    }
  };

  const statusBodyTemplate = ({ Status }: Table) => {
    return <Tag value={Status._value} severity={getSeverity(Status._value)} />;
  };

  const actionBodyTemplate = (rowData: Table) => {
    console.log("Row Data Called");
    const isEmptyLowerLayers = rowData.LowerLayers._value === "";
    const isEmpty = rowData.IPv4AddressNumberOfEntries._value === 0;
    const IPInterface = new LinkParser(device).findByLowerLayers(rowData.Id);

    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          onClick={() => editInterface(rowData)}
        />
        {(isEmptyLowerLayers || !IPInterface) && (
          <RemoveButton
            accept={() => removeInterface(rowData)}
            loading={removeLoading}
          />
        )}
      </>
    );
  };

  return (
    <DataTable
      value={new InterfaceParser(device).getTables()}
      filters={filters}
      globalFilterFields={[
        "Hardware._value",
        "Enable._value",
        "IPv4AddressNumberOfEntries._value",
        "Status._value",
      ]}
      header={header}
    >
      <Column sortable field="Hardware._value" header="Interface"></Column>
      <Column
        sortable
        field="Enable._value"
        header="Enable"
        body={enableBodyTemplate}
      ></Column>
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
