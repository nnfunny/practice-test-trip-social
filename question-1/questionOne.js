const TAB = "  ";

function questionOne(index, tab, arr) {
  if (index >= arr.length) {
    return "";
  }

  tab = index == 0 ? "" : tab + TAB;
  let openingTag = `${tab}<${arr[index]}>\n`;
  let closingTag =
    index == 0
      ? `${tab}</${arr[index]}>`
      : `${tab}</${arr[index]}>\n`;
  let output = `${openingTag}${questionOne(
    index + 1,
    tab,
    arr
  )}${closingTag}`;

  return output;
}

let arr = [1, 2, 3, 4, 5, 6];
console.log(questionOne(0, "", arr));
