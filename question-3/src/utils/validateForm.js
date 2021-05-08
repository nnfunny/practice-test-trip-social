export default function validateForm(submittedForm) {
  if (submittedForm === undefined || Object.keys(submittedForm).length === 0) {
    alert("Please fill out the form");
    return;
  }

  // Email
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = submittedForm["email"];
  if (!re.test(String(email).toLowerCase())) {
    alert("Email is invalid");
    return;
  }
}
