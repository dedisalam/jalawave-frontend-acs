"use client";

import React, { useContext, useEffect, useState } from "react";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuContext } from "@/layout/context/menucontext";
import CardDeviceInfo from "@/components/card/mikrotik/CardDeviceInfo";
import CardEthernet from "@/components/card/mikrotik/CardEthernet";
import TableDeviceInfo from "@/components/table/mikrotik/TableDeviceInfo";
import TableEthernet from "@/components/table/mikrotik/TableEthernet";
import { Mikrotik } from "@/parsers/Mikrotik";

interface MikrotikPageProps {
  device: DeviceObjectMikrotik;
}

export default function MikrotikPage({ device }: MikrotikPageProps) {
  const { activeListMenu, setActiveListMenu } = useContext(MenuContext);
  const [menuLength, setMenuLength] = useState(activeListMenu.length);
  const menu = React.useMemo(
    () => [...activeListMenu, new Mikrotik(device).getMenuItem()],
    [activeListMenu, device]
  );

  useEffect(() => {
    if (activeListMenu.length === menuLength) {
      setActiveListMenu(menu);
      setMenuLength(activeListMenu.length);
    }
  }, [setActiveListMenu, activeListMenu, menuLength, menu]);

  return (
    <>
      <CardDeviceInfo>
        <TableDeviceInfo device={device} />
      </CardDeviceInfo>
      <CardEthernet>
        <TableEthernet device={device} />
      </CardEthernet>
    </>
  );
}
