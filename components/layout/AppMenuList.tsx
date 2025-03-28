import React, { Suspense, useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { MenuContext } from "./context/menucontext";

const AppMenuList = () => {
  const { activeListMenu } = useContext(MenuContext);

  return (
    <ul className="layout-menu">
      {activeListMenu.map((item, i) => {
        return !item?.seperator ? (
          <Suspense key={item.label}>
            <AppMenuitem item={item} root={true} index={i} />
          </Suspense>
        ) : (
          <li className="menu-separator"></li>
        );
      })}
    </ul>
  );
};

export default AppMenuList;
