const TAB = "  ";

function questionTwo(stringInput) {
  let tagNames = extractTagNames(stringInput);
  let output = pretifyString(0, "", tagNames);
  let onelineOutput = output.replace(/(\s+|\n|\r|\r\n)/gi, "");

  if (onelineOutput !== stringInput) {
    let errorMessage = "Error: the string cannot be parse to valid xml";
    return errorMessage;
  }
  return output;
}

function extractTagNames(stringInput) {
  let tags = stringInput.split(/>\s*</);

  let tagNames = tags.filter((tag) => tag.match(/^<?\w+/));

  tagNames[0] = tagNames[0].substring(1);

  return tagNames;
}

function pretifyString(index, tab, arr) {
  if (index >= arr.length) {
    return "";
  }

  tab = index == 0 ? "" : tab + TAB;
  let openingTag = `${tab}<${arr[index]}>\n`;
  let closingTag =
    index == 0 ? `${tab}</${arr[index]}>` : `${tab}</${arr[index]}>\n`;
  let output = `${openingTag}${pretifyString(
    index + 1,
    tab,
    arr
  )}${closingTag}`;

  return output;
}

let testString = "<a><b><c><d><e><f></f></e></d></c></b></a>";
console.log(questionTwo(testString));
