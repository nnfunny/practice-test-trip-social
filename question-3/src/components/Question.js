import { DROPDOWN, TEXT_INPUT } from "../utils/constants";
import Dropdown from "./Dropdown";
import TextInput from "./TextInput";

const Question = ({ title, fields }) => {
  return (
    <div className="mb-4">
      <h2>{title}</h2>
      <div className="row g-2">
        {fields.map((field) => {
          if (field.type === TEXT_INPUT) {
            const { name, label } = field;
            return <TextInput key={name} name={name} label={label} />;
          }

          if (field.type === DROPDOWN) {
            const { name, label, options } = field;
            return (
              <Dropdown
                key={name}
                name={name}
                label={label}
                options={options}
              />
            );
          }
          return <div>Nothing</div>;
        })}
      </div>
    </div>
  );
};

export default Question;
