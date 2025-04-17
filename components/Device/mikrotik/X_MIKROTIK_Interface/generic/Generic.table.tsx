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
import { InterfaceGeneric } from "@/types/mikrotik";
import { Tag } from "primereact/tag";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function GenericTable() {
  const { device } = useContext(MikrotikContext);
  // const { setFormData, setDialog, setDialogHeader } =
  //   useContext(GenericContext);
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

  // const edit = (data: InterfaceGeneric) => {
  //   setFormData(data);
  //   setDialog(true);
  //   setDialogHeader("Interface Generic Details");
  // };

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

  const idBodyTemplate = (rowData: InterfaceGeneric) => {
    const arrOfId = rowData.Id._value.split(".");
    const id = arrOfId[arrOfId.length - 1];

    return id;
  };

  const statusBodyTemplate = ({ Status }: InterfaceGeneric) => {
    return <Tag value={Status._value} severity={getSeverity(Status._value)} />;
  };

  // const actionBodyTemplate = (data: InterfaceGeneric) => {
  //   return (
  //     <Button
  //       icon="pi pi-pencil"
  //       rounded
  //       severity="success"
  //       onClick={() => edit(data)}
  //     />
  //   );
  // };

  return (
    <DataTable
      value={new Mikrotik(device).findAllInterfaceGeneric()}
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
      <Column sortable field="Name._value" header="Name"></Column>
      <Column sortable field="Enable._value" header="Enable"></Column>
      <Column
        sortable
        field="Status._value"
        body={statusBodyTemplate}
        header="Status"
      ></Column>
      {/* <Column body={actionBodyTemplate}></Column> */}
    </DataTable>
  );
}
