"use client";

import { AddressContext } from "@/components/Device/mikrotik/ip/address/Address.context";
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
import { MikrotikContext } from "../../Mikrotik.context";
import { IPAddress } from "@/types/mikrotik";
import { IPAddressService } from "@/service/IPAddressService";
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { Address } from "@/service/parser/mikrotik/ip/address";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function AddressTable() {
  const { toast } = useContext(LayoutContext);
  const { device, setRefresh } = useContext(MikrotikContext);
  const { setFormData, setDialog, setDialogHeader } =
    useContext(AddressContext);
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

  const edit = (data: IPAddress) => {
    setFormData(data);
    setDialog(true);
    setDialogHeader("IP Address Details");
  };

  const remove = async (data: IPAddress) => {
    const response = await new IPAddressService().remove(
      device._id,
      data.IPInterface,
      data
    );
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

  const flagBodyTemplate = ({ AddressingType }: IPAddress) => {
    if (AddressingType._value === "X_MIKROTIK_Dynamic") {
      return <Tag value="D" severity="warning" />;
    }
  };

  const enableBodyTemplate = ({ Enable }: IPAddress) => {
    if (Enable._value) {
      return <Tag value="Enabled" severity="success" />;
    } else {
      return <Tag value="Disabled" severity="danger" />;
    }
  };

  const actionBodyTemplate = (data: IPAddress) => {
    const isDynamic = data.AddressingType._value === "X_MIKROTIK_Dynamic";

    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          onClick={() => edit(data)}
        />
        {!isDynamic && (
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

  return (
    <DataTable
      value={new Address(device).findAll()}
      filters={filters}
      globalFilterFields={["ip", "network", "interface"]}
      header={header}
    >
      <Column
        field="AddressingType._value"
        headerStyle={{ width: "3rem" }}
        body={flagBodyTemplate}
      ></Column>
      <Column sortable field="CIDR._value" header="Address"></Column>
      <Column sortable field="Network._value" header="Network"></Column>
      <Column
        sortable
        field="HWInterface.Name._value"
        header="Interface"
      ></Column>
      <Column
        sortable
        field="Enable._value"
        header="Status"
        body={enableBodyTemplate}
      ></Column>
      <Column body={actionBodyTemplate}></Column>
    </DataTable>
  );
}
