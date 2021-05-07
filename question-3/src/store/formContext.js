import { createContext, useEffect, useState } from "react";
import { FORM_CONFIG_URL } from "../utils/constants";
import createInitialObject from "../utils/createIntialObject";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [submittedForm, setSubmittedForm] = useState({});

  useEffect(() => {
    fetch(FORM_CONFIG_URL)
      .then((response) => response.json())
      .then((fetchedData) => {
        const initalFormObject = createInitialObject(fetchedData.questions);
        setSubmittedForm(initalFormObject);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <FormContext.Provider value={[submittedForm, setSubmittedForm]}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
