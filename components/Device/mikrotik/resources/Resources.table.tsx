"use client";

import React, { useContext } from "react";
import { Mikrotik } from "@/service/parser/Mikrotik";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { MikrotikContext } from "../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";

export function ResourcesTable() {
  const { device } = useContext(MikrotikContext);

  if (!device) {
    return <Skeleton height="51rem"></Skeleton>;
  }

  return (
    <DataTable
      value={new Mikrotik(device).getResources()}
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column field="field"></Column>
      <Column field="value"></Column>
    </DataTable>
  );
}
