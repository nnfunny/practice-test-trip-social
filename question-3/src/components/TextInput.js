import { useContext } from "react";
import FormContext from "../store/formContext";
import converToCamelCase from "../utils/convertToCamelCase";

const TextInput = ({ label, name }) => {
  const [submittedForm, setSubmittedForm] = useContext(FormContext);

  const handleChange = (e) => {
    const camelCasedName = converToCamelCase(name);
    setSubmittedForm({...submittedForm, [camelCasedName]: e.target.value})
  }

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} name={name} onChange={handleChange}/>
    </div>
  );
};

export default TextInput;
