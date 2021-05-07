import { useContext } from "react";
import FormContext from "../store/formContext";
import converToCamelCase from "../utils/convertToCamelCase";

const Dropdown = ({ label, name, options }) => {
  const [submittedForm, setSubmittedForm] = useContext(FormContext);

  const handleChange = (e) => {
    const camelCasedName = converToCamelCase(name);
    setSubmittedForm({ ...submittedForm, [camelCasedName]: e.target.value });
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select id={name} defaultValue="" onChange={handleChange}>
        <option value="" disabled hidden>
          Choose here
        </option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
