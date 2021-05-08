import { useContext } from "react";
import FormContext from "../store/formContext";
import converToCamelCase from "../utils/convertToCamelCase";

const TextInput = ({ label, name }) => {
  const [submittedForm, setSubmittedForm] = useContext(FormContext);

  const handleChange = (e) => {
    const camelCasedName = converToCamelCase(name);
    setSubmittedForm({ ...submittedForm, [camelCasedName]: e.target.value });
  };

  return (
    <>
      <div className="mb-2 col-md-8">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <input
          className="form-control"
          type="text"
          id={name}
          name={name}
          onChange={handleChange}
          required
        />
      </div>
      <br />
    </>
  );
};

export default TextInput;
