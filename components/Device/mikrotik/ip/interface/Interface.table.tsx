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
import { RemoveButton } from "../../Remove.button";

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

  if (device === undefined) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const edit = ({ Id }: Table) => {
    const Interface = new InterfaceParser(device).findById(Id);
    if (Interface) {
      setFormData(Interface);
      setDialog(true);
      setDialogHeader("IP Interface Details");
    }
  };

  const remove = async ({ Id }: Table) => {
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
    const isEmpty = item.IPv4AddressNumberOfEntries._value === 0;

    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          onClick={() => edit(item)}
        />
        {isEmpty && (
          <>
            <RemoveButton
              accept={() => remove(item)}
              loading={removeLoading}
              group={item.Id._value}
            />
          </>
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
