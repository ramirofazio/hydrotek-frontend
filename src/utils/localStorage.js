export const saveInStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getOfStorage = (key) => {
  if (key?.length) {
    return JSON.parse(localStorage.getItem(key));
  }
};

export const deleteOfStorage = (key) => {
  if (key?.length) {
    let object = localStorage.getItem(key);
    if (!object.length) {
      return "no such item in loaclStorage";
    }
    localStorage.removeItem(key);
    return `delete ${key} succesfully`;
  }
};

export const cleanStorage = () => {
  const accessToken = getOfStorage("accessToken");
  localStorage.clear();
  saveInStorage("accessToken", accessToken);
};
