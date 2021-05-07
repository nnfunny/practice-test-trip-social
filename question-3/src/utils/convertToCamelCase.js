export default function converToCamelCase(stringInput) {
  return stringInput
    .replace(/(?:^\w|[A-Z]|\b\w|_\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/(?:\s+|_)/g, "");
}
