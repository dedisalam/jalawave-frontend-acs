import { InputText } from "primereact/inputtext";
import { ChangeEvent, useContext } from "react";
import { AuthContext } from "../Auth.context";

export function UsernameInput() {
  const { setFormData, submitted, formData } = useContext(AuthContext);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target && e.target.value;

    setFormData((data) => {
      return {
        ...data,
        username: val,
      };
    });
  };

  return (
    <>
      <label
        htmlFor="username"
        className="block text-900 text-xl font-medium mb-2"
      >
        Username
      </label>
      <InputText
        value={formData.username}
        id="username"
        type="text"
        placeholder="Username"
        className="w-full md:w-30rem"
        onChange={onChange}
        style={{ padding: "1rem" }}
        invalid={submitted && !formData.username}
      />
      {submitted && !formData.username && (
        <small className="p-error block mb-2">Username is not empty.</small>
      )}
    </>
  );
}
