import { useContext } from "react";
import "./App.css";
import Question from "./components/Question";
import useFetch from "./hooks/useFetch";
import FormContext from "./store/formContext";
import { FORM_CONFIG_URL } from "./utils/constants";
import validateForm from "./utils/validateForm";

function App() {
  const config = useFetch(FORM_CONFIG_URL);
  const [submittedForm] = useContext(FormContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm(submittedForm);

    console.log(submittedForm);
    console.table(submittedForm);
  };

  return (
    <div className="container">
      {config && (
        <form className="needs-validation" onSubmit={handleSubmit}>
          {config.questions.map((question) => {
            const { title, fields } = question;
            return <Question key={title} title={title} fields={fields} />;
          })}
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
