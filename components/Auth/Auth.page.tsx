"use client";

import { Button } from "primereact/button";
import { PasswordInput } from "./input/password.input";
import { UsernameInput } from "./input/username.input";
import { classNames } from "primereact/utils";
import { useContext } from "react";
import { AuthContext } from "./Auth.context";
import { AuthService } from "./Auth.service";
import { emptyData } from "./Auth.data";
import { FullPageContext } from "../FullPage/FullPage.context";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export function AuthPage() {
  const { toast } = useContext(FullPageContext);
  const { formData, isLoading, setIsLoading, setFormData, setSubmitted } =
    useContext(AuthContext);

  const router = useRouter();

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  );

  const login = async () => {
    setSubmitted(true);
    setIsLoading(true);
    try {
      if (formData.password && formData.username) {
        await new AuthService().login(formData.username, formData.password);
        router.push("/");
        setFormData(emptyData);
        setSubmitted(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.response?.data.message || "",
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <div
          className="w-full surface-card py-8 px-5 sm:px-8"
          style={{ borderRadius: "53px" }}
        >
          <UsernameInput />
          <PasswordInput />

          <Button
            label="Log In"
            className="flex align-items-center w-full mt-5"
            onClick={login}
            loading={isLoading}
          ></Button>
        </div>
      </div>
    </div>
  );
}
