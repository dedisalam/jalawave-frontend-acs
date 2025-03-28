"use client";

import CardHome from "@/components/card/CardHome";
import { MenuContext } from "@/layout/context/menucontext";
import { useContext, useEffect } from "react";

export default function HomePage() {
  const { setActiveListMenu } = useContext(MenuContext);

  useEffect(() => {
    setActiveListMenu([
      {
        label: "Home",
        items: [{ label: "Devices", icon: "pi pi-fw pi-home", to: "/devices" }],
      },
    ]);
  }, [setActiveListMenu]);

  return <CardHome />;
}
