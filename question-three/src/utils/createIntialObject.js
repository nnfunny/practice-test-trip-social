import converToCamelCase from "./convertToCamelCase";

export default function createInitialObject(questions) {
  const intialOjbect = {};

  questions.forEach((question) => {
    question.fields.forEach((field) => {
      const camelCasedField = converToCamelCase(field.name);
      intialOjbect[camelCasedField] = "";
    });
  });

  return intialOjbect;
}
