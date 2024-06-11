const useStorage = () => {
  const setStorageItem = (key, value) => {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  };

  const getStorageItem = (key) => {
    let value = localStorage.getItem(key);
    try {
      if (value) {
        value = JSON.parse(value);
        return value;
      } else {
        console.log(1400);
        return {};
      }
    } catch (err) {
      console.log(1500);
      return {};
    }
  };

  return { setStorageItem, getStorageItem };
};

export default useStorage;
