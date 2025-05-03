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
import { Button } from "primereact/button";
import { LinkContext } from "./Link.context";
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { Table } from "./Link";
import { LinkParser } from "./Link.parser";
import { LinkService } from "./Link.service";
import { InterfaceParser as IPInterfaceParser } from "../../ip/interface/Interface.parser";
import { Tag } from "primereact/tag";
import { RemoveButton } from "../../Remove.button";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function LinkTable() {
  const { toast } = useContext(LayoutContext);
  const { device, setRefresh } = useContext(MikrotikContext);
  const { setFormData, setDialog, setDialogHeader } = useContext(LinkContext);
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

  const edit = ({ Id }: Table) => {
    const link = new LinkParser(device).findById(Id);
    if (link) {
      setFormData(link);
      setDialog(true);
      setDialogHeader("Link Details");
    }
  };

  const remove = async ({ Id }: Table) => {
    setRemoveLoading(true);
    const link = new LinkParser(device).findById(Id);
    if (link) {
      const response = await new LinkService().remove(device._id, link);
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
    const isEmptyLowerLayers = item.LowerLayers._value === "";
    const IPInterface = new IPInterfaceParser(device).findByLowerLayers(
      item.Id
    );
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          onClick={() => edit(item)}
        />
        {(isEmptyLowerLayers || !IPInterface) && (
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
      value={new LinkParser(device).getTables()}
      filters={filters}
      globalFilterFields={["Hardware._value", "Enable._value", "Status._value"]}
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
        field="Status._value"
        header="Status"
        body={statusBodyTemplate}
      ></Column>
      <Column body={actionBodyTemplate}></Column>
    </DataTable>
  );
}
