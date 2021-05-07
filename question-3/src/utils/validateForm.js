import covertToCapitalizedCase from "./convertToCaptializedCase";

export default function validateForm(submittedForm) {
  if (submittedForm === undefined || Object.keys(submittedForm).length === 0) {
    alert("Please fill out the form");
    return;
  }

  for (let [key, value] of Object.entries(submittedForm)) {
    if (value === "" || value === null || value === undefined) {
      alert(`${covertToCapitalizedCase(key)} is empty`);
      return;
    }

    if (key === "email") {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(String(value).toLowerCase())) {
        alert("Email is invalid");
        return;
      }
    }
  }
}
