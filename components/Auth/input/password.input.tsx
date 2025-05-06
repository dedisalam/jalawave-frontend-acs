import { Password } from "primereact/password";
import { ChangeEvent, useContext } from "react";
import { AuthContext } from "../Auth.context";

export function PasswordInput() {
  const { setFormData, submitted, formData, setSubmitted } =
    useContext(AuthContext);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmitted(false);
    const val = e.target && e.target.value;

    setFormData((data) => {
      return {
        ...data,
        password: val,
      };
    });
  };

  return (
    <>
      <label
        htmlFor="password"
        className="block text-900 font-medium text-xl mb-2 mt-5"
      >
        Password
      </label>
      <Password
        value={formData.password}
        inputId="password"
        placeholder="Password"
        toggleMask
        className="w-full"
        inputClassName="w-full p-3 md:w-30rem"
        feedback={false}
        onChange={onChange}
        invalid={submitted && !formData.password}
      ></Password>
      {submitted && !formData.password && (
        <small className="p-error block mb-2">Password is not empty.</small>
      )}
    </>
  );
}
