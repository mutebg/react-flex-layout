export const firstToUpper = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const determinateProp = (prosp, type, sizes, def) => {
  const currentSize = sizes[0];
  if (!currentSize) {
    return def;
  }
  const value = prosp[type + toUpperFirst(currentSize)];
  return value || def;
};

export const createInitState = mqs =>
  Object.keys(mqs).reduce((prev, key) => {
    const mq = mqs[key];
    let mql = window.matchMedia(mq);
    if (mql.matches) {
      prev.push(key);
    }
    return prev;
  }, []);
