export const firstToUpper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const determinateProp = (prosp, type, sizes, def) => {
  const currentSize = sizes[0];
  if (!currentSize) {
    return def;
  }
  const value = prosp[type + firstToUpper(currentSize)];
  return value || def;
};

export const createInitState = (mqs) =>
  Object.keys(mqs).reduce((prev, key) => {
    const mq = mqs[key];
    let mql = window.matchMedia(mq);
    if (mql.matches) {
      prev.push(key);
    }
    return prev;
  }, []);

export const cleanProps = (props) => {
  const types = ["layout", "gap", "align", "size", "offset", "fill", "order"];
  const mqs = ["xs", "sm", "md", "lg", "xl"];
  const allCobinations = types
    .map((type) => {
      return mqs.map((mq) => type + firstToUpper(mq));
    })
    .flat();
  return Object.keys(props).reduce((all, prop) => {
    if (allCobinations.indexOf(prop) === -1) {
      all[prop] = props[prop];
    }
    return all;
  }, {});
};
