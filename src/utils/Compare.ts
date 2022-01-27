/**
 * Compare two array and return true, if a value matche
 * @param arr1
 * @param arr2
 * @returns true if one value of arr1 exist in arr2
 */
export const CompareArraySome = (arr1: any[], arr2: any[]): boolean => {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) return true;
    }
  }
  return false;
};

/**
 * Compase two array and return true, if each value matche
 * @param arr1
 * @param arr2
 * @returns true if all value of arr1 exists in arr2
 */
export const CompareArrayEvery = (arr1: any[], arr2: any[]): boolean => {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] !== arr2[j]) return false;
    }
  }
  return true;
};
