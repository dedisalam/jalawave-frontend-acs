import React, { Suspense } from "react";
import AppMenuitem from "./AppMenuitem";
import { MenuProvider } from "./context/menucontext";
import { AppMenuItem } from "@/types/layout";

const AppMenu = () => {
  const model: AppMenuItem[] = [
    {
      label: "Home",
      items: [{ label: "Devices", icon: "pi pi-fw pi-home", to: "/devices" }],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <Suspense>
              <AppMenuitem item={item} root={true} index={i} key={item.label} />
            </Suspense>
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
