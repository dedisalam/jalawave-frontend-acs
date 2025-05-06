import Link from "next/link";
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { LayoutContext } from "./context/layoutcontext";
import { AppTopbarRef } from "@/types/layout";
import { classNames } from "primereact/utils";
import { AuthService } from "../Auth/Auth.service";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { LogoutButton } from "./Logout.button";

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const { onMenuToggle, showProfileSidebar, layoutState, toast } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  const router = useRouter();

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  const onLogout = async () => {
    try {
      await new AuthService().logout();
      router.push("/auth/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.response?.data.message || "",
        });
      }
    }
  };

  return (
    <div className="layout-topbar">
      <Link href="/" className="layout-topbar-logo">
        <span>ACS Jalawave</span>
      </Link>

      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}
      >
        <LogoutButton accept={onLogout} group="logout" />
      </div>
    </div>
  );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
