import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { FORM_CONFIG_URL } from "../utils/constants";
import createInitialObject from "../utils/createIntialObject";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [submittedForm, setSubmittedForm] = useState({});
  const config = useFetch(FORM_CONFIG_URL);

  useEffect(() => {
    if (config != null) {
      const initalFormObject = createInitialObject(config.questions);
      setSubmittedForm(initalFormObject);
    }
  }, [config]);

  return (
    <FormContext.Provider value={[submittedForm, setSubmittedForm]}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
