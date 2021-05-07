export default function covertToCapitalizedCase(text) {
  return text.replace(/(?:^\w|[A-Z])/g, function (word, index) {
    return index === 0 ? word.toUpperCase() : ` ${word.toUpperCase()}`;
  })
}