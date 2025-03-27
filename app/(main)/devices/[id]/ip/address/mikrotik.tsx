"use client";

import { Mikrotik } from "@/parsers/Mikrotik";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import React, { useEffect, useState } from "react";

interface RowData {
  interface?: string;
  ip: string;
  network: string;
  flag: string;
}

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function IpAddressMikrotik({
  device,
}: {
  device: DeviceObjectMikrotik;
}) {
  const emptyIP: RowData = {
    flag: "",
    ip: "",
    network: "",
    interface: "",
  };

  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [IP, setIP] = useState<RowData>(emptyIP);
  const [IPDialog, setIPDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    initFilters();
  }, []);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

    (_filters["global"] as DataTableFilterMetaData).value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setIPDialog(false);
  };

  const saveIP = () => {
    setSubmitted(true);

    setIPDialog(false);
    setIP(emptyIP);
  };

  const editIP = (IP: RowData) => {
    setIP({ ...IP });
    setIPDialog(true);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    const _IP = { ...IP };
    _IP[name as keyof RowData] = val;

    setIP(_IP);
  };

  const initFilters = () => {
    setFilters(defaultFilters);
    setGlobalFilterValue("");
  };

  const renderHeader = () => {
    return (
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
  };

  const header = renderHeader();

  const IPDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" text onClick={saveIP} />
    </>
  );

  const flagBodyTemplate = (rowData: RowData) => {
    if (rowData.flag === "X_MIKROTIK_Dynamic") {
      return <Tag value="D" severity="warning" />;
    }
  };

  const actionBodyTemplate = (rowData: RowData) => {
    return (
      <Button
        icon="pi pi-pencil"
        rounded
        severity="success"
        onClick={() => editIP(rowData)}
      />
    );
  };

  return (
    <Card title="Address List" className="mb-4">
      <DataTable
        value={new Mikrotik(device).getIPs()}
        tableStyle={{ minWidth: "50rem" }}
        filters={filters}
        globalFilterFields={["ip", "network", "interface"]}
        header={header}
      >
        <Column field="flag" body={flagBodyTemplate}></Column>
        <Column sortable field="ip" header="Address"></Column>
        <Column sortable field="network" header="Network"></Column>
        <Column sortable field="interface" header="Interface"></Column>
        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <Dialog
        visible={IPDialog}
        style={{ width: "450px" }}
        header="IP Details"
        modal
        className="p-fluid"
        footer={IPDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="ip">IP</label>
          <InputText
            id="ip"
            value={IP.ip}
            onChange={(e) => onInputChange(e, "ip")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !IP.ip,
            })}
          />
          {submitted && !IP.ip && (
            <small className="p-invalid">IP is required.</small>
          )}
        </div>
      </Dialog>
    </Card>
  );
}
