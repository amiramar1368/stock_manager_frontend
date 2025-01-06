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
        return {};
      }
    } catch (err) {
      return {};
    }
  };

  return { setStorageItem, getStorageItem };
};

export default useStorage;
