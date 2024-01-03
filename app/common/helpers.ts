export const saveToLocalStorage = (key: string, value: string) => {
  const existingData = localStorage.getItem(key);
  console.log("inside", existingData, existingData !== null);

  if (existingData !== null) {
    localStorage.removeItem(key);
  }

  localStorage.setItem(key, JSON.stringify(value));
};
