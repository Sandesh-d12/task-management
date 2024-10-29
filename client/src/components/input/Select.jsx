import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";

export function Select(props) {
  const { option, name, label, ...rest } = props;
  return (
    <div className="my-2">
      <label
        htmlFor={name}
        className="block text-left pl-2 text-xs font-medium"
      >
        {" "}
        {label}{" "}
      </label>

      <Field
        as="select"
        name={name}
        id={name}
        {...rest}
        className="mt-1 w-full rounded-md border border-gray-200 shadow-sm sm:text-sm py-2 px-2"
      >
        {option.map((item, index) => (
          <option value={item.value} key={index}>
            {item.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
