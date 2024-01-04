export const saveToLocalStorage = (
  key: string,
  value: string,
  stringify = true
) => {
  // const existingData = localStorage.getItem(key);
  // console.log("inside", existingData, existingData !== null);

  // if (existingData !== null) {
  //   localStorage.removeItem(key);
  // }

  try {
    if (stringify) {
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const getFromLocalStorage = (key: string, parse = true) => {
  try {
    const value = localStorage.getItem(key);

    if (parse) {
      return JSON.parse(value || "");
    }

    return value;
  } catch (error) {
    console.log(error);
  }
};
