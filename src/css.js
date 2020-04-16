import hash from "./hash";
const SHEET_NAME = "rfl";
const CLASS_NAME_PREFIX = "rfl";
const cache = new Map();

export const createCSS = (cssObj) => {
  let cssString = Object.keys(cssObj)
    .map((cssProp) => {
      const cssVal = cssObj[cssProp];
      //console.log(toCSS(cssProp, cssVal));
      return toCSS(cssProp, cssVal);
    })
    .join(";");

  cachedClassName = cache.get(cssString);
  if (cachedClassName) {
    return cachedClassName;
  }

  const className = CLASS_NAME_PREFIX + hash(cssString).toString(36);

  cache.set(cssString, className);

  const sheet = getSheet();

  addCSSRule(sheet, "." + className, cssString);
  return className;
};

function addCSSRule(sheet, selector, rules) {
  if ("insertRule" in sheet) {
    sheet.insertRule(`${selector} {
      ${rules}
    }`);
  } else if ("addRule" in sheet) {
    sheet.addRule(selector, rules);
  }
}

const toHyphen = (prop) =>
  prop.replace(/([A-Z])/g, (char) => `-${char[0].toLowerCase()}`);

const toCSS = (prop, val) => {
  return `${toHyphen(prop.trim())}: ${val.trim().replace(/'|,/g, "")}`;
};

const getSheet = () => {
  let styleElemenet = document.querySelector(`style#${SHEET_NAME}`);
  if (styleElemenet) {
    return styleElemenet.sheet;
  }

  return createSheet();
};

const createSheet = () => {
  const style = document.createElement("style");
  style.setAttribute("id", SHEET_NAME);
  document.head.appendChild(style);
  return style.sheet;
};
