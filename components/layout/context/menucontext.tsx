import { AppMenuItem, MenuContextProps } from "@/types/layout";
import { ChildContainerProps } from "@/types/types";
import React, { useState, createContext } from "react";

export const MenuContext = createContext({} as MenuContextProps);

export const MenuProvider = ({ children }: ChildContainerProps) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [activeListMenu, setActiveListMenu] = useState<AppMenuItem[]>([
    {
      label: "Home",
      items: [{ label: "Devices", icon: "pi pi-fw pi-home", to: "/devices" }],
    },
    {
      label: "System",
      items: [{ label: "Users", icon: "pi pi-fw pi-user", to: "/users" }],
    },
  ]);

  const value = {
    activeMenu,
    setActiveMenu,
    activeListMenu,
    setActiveListMenu,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
