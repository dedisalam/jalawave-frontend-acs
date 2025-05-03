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
import { Table } from "./Address";
import { AddressParser } from "./Address.parser";
import { MenuString } from "@/types/genieacs/base";
import { AddressService } from "./Address.service";
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { RemoveButton } from "../../Remove.button";

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
    const address = new AddressParser(device).findById(Id);
    if (address) {
      setFormData(address);
      setDialog(true);
      setDialogHeader("IP Address Details");
    }
  };

  const remove = async ({ Id }: Table) => {
    setRemoveLoading(true);
    const address = new AddressParser(device).findById(Id);
    if (address) {
      const [d, ip, i, id] = address.Id._value.split(".");
      const Interface: MenuString = {
        _object: false,
        _type: "xsd:string",
        _value: `${d}.${ip}.${i}.${id}`,
        _timestamp: Date.now().toString(),
        _writable: false,
      };
      const response = await new AddressService().remove(
        device._id,
        Interface,
        address
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

  const flagBodyTemplate = ({ AddressingType }: Table) => {
    if (AddressingType._value === "D") {
      return <Tag value="D" severity="warning" />;
    }
  };

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

  const actionBodyTemplate = (item: Table) => {
    const isDynamic = item.AddressingType._value === "X_MIKROTIK_Dynamic";

    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          onClick={() => edit(item)}
        />
        {!isDynamic && (
          <RemoveButton
            accept={() => remove(item)}
            group={item.Id._value}
            loading={removeLoading}
          />
        )}
      </>
    );
  };

  return (
    <DataTable
      value={new AddressParser(device).getTables()}
      filters={filters}
      globalFilterFields={[
        "AddressingType._value",
        "CIDR._value",
        "Network._value",
        "Hardware._value",
        "Enable._value",
      ]}
      header={header}
    >
      <Column
        field="AddressingType._value"
        headerStyle={{ width: "3rem" }}
        body={flagBodyTemplate}
      ></Column>
      <Column sortable field="CIDR._value" header="Address"></Column>
      <Column sortable field="Network._value" header="Network"></Column>
      <Column sortable field="Hardware._value" header="Interface"></Column>
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
