import { DROPDOWN, TEXT_INPUT } from "../utils/constants";
import Dropdown from "./Dropdown";
import TextInput from "./TextInput";

const Question = ({ title, fields }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>
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
