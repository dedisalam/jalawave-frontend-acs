"use client";

import { AddressContext } from "@/components/Device/mikrotik/ip/address/Address.context";
import { Mikrotik } from "@/service/parser/Mikrotik";
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

  const editIP = (data: IPAddress) => {
    setFormData(data);
    setDialog(true);
    setDialogHeader(`Address <${data.CIDR._value}>`);
  };

  const removeIP = (data: IPAddress) => {
    new IPAddressService()
      .remove(device._id, data.IPInterface, data)
      .then((response) => {
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
            detail: "Error Remove IP",
          });
        }
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

  const idBodyTemplate = (rowData: IPAddress) => {
    const arrOfId = rowData.Id._value.split(".");
    const id = arrOfId[arrOfId.length - 1];
    const idInterface = arrOfId[arrOfId.length - 3];

    return `IP Interface ${idInterface}.${id}`;
  };

  const flagBodyTemplate = ({ AddressingType }: IPAddress) => {
    if (AddressingType._value === "X_MIKROTIK_Dynamic") {
      return <Tag value="D" severity="warning" />;
    }
  };

  const actionBodyTemplate = (rowData: IPAddress) => {
    const isDynamic = rowData.AddressingType._value === "X_MIKROTIK_Dynamic";

    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          onClick={() => editIP(rowData)}
        />
        {!isDynamic && (
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            onClick={() => removeIP(rowData)}
            className="ml-3"
          />
        )}
      </>
    );
  };

  return (
    <DataTable
      value={new Mikrotik(device).findAllIPAddress()}
      filters={filters}
      globalFilterFields={["ip", "network", "interface"]}
      header={header}
    >
      <Column
        field="AddressingType._value"
        headerStyle={{ width: "3rem" }}
        body={flagBodyTemplate}
      ></Column>
      <Column
        sortable
        field="Id._value"
        header="Id"
        body={idBodyTemplate}
      ></Column>
      <Column sortable field="CIDR._value" header="Address"></Column>
      <Column sortable field="Network._value" header="Network"></Column>
      <Column
        sortable
        field="HWInterface.Name._value"
        header="Hardware Interface"
      ></Column>
      <Column body={actionBodyTemplate}></Column>
    </DataTable>
  );
}
