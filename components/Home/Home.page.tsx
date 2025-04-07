"use client";

import { MenuContext } from "@/components/layout/context/menucontext";
import { useContext, useEffect } from "react";
import { HomeCard } from "./Home.card";

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

  return <HomeCard />;
}
