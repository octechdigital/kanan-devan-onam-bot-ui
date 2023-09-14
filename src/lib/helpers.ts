/* eslint-disable */
export const get = (obj: any, path: string | null, defaultValue: any = null) =>
  String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce(
      (a: any, c) =>
        a && Object.hasOwnProperty.call(a, c) ? a[c] : defaultValue,
      obj
    );

export const isNil = (obj: any): boolean => obj == null || obj === undefined;

export const isNull = (obj: any): boolean => obj == null;

export const isUndefined = (obj: any): boolean => obj === undefined;

export const isNaN = (obj: any): boolean => Number.isNaN(obj);

export const isEmpty = (obj: any): boolean =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

export const head = (objArray: any[]): any => {
  const [firstElem, ...tail] = objArray;
  return firstElem || '';
};

export const isFunction = (object: any) => {
  return !!(object && object.constructor && object.call && object.apply);
};

const sortByHelper = (key: any) => {
  return (a: any, b: any) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
};

export const sortBy = (object: any[], key?: any) => {
  if (key) {
    return object.concat().sort(sortByHelper(key));
  } else {
    return object.sort();
  }
};

export const intersection = (array: any[], ...restArrays: any[]) => {
  const arrayOfArrays = [array, ...restArrays];
  return arrayOfArrays.reduce((a, b) => a.filter((c: any) => b.includes(c)));
};

export const deleteInPath = (object: any, path: string) => {
  let currentObject = object;
  const parts: string[] = path.split('.');
  const targetProp = parts.pop();
  for (const part of parts) {
    currentObject = currentObject[part];
    if (!currentObject) {
      return;
    }
  }
  if (targetProp) {
    Reflect.deleteProperty(currentObject, targetProp);
  }
};
